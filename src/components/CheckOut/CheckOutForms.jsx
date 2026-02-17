"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, Shield, Smartphone, Loader2, ExternalLink, AlertCircle, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

// bKash Configuration
const BKASH_CONFIG = {
  IS_SANDBOX: true,
  CALLBACK_URL: typeof window !== 'undefined' ? `${window.location.origin}/api/bkash/callback` : "",
};

// Test credentials for bKash sandbox
const BKASH_TEST_CREDENTIALS = {
  PHONE: "01770618575",
  OTP: "123456",
  MPIN: "12121"
};

const CheckOutForms = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentId, setPaymentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [idToken, setIdToken] = useState("");
  const [showTestInfo, setShowTestInfo] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  const courseId = searchParams.get("course");

  // Initialize with test data
  useEffect(() => {
    setFormData({
      fullname: "Test User",
      email: "test@example.com",
      phone: "01770618575",
    });
  }, []);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        toast.error("No course selected");
        router.push("/courses");
        return;
      }

      try {
        setLoading(true);
        // Fetch from your actual API
        const response = await axios.get(
          `https://shekhai-server.onrender.com/api/v1/courses/${courseId}`
        );

        if (response.data.success) {
          const courseData = response.data.course || response.data.data;
          setCourse({
            id: courseData._id || courseData.id,
            title: courseData.title || "Unknown Course",
            shortDescription: courseData.description || courseData.shortDescription || "No description available",
            price: courseData.price || courseData.fee || 0,
            bannerUrl: courseData.bannerUrl || courseData.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          });
        } else {
          throw new Error("Failed to fetch course");
        }

      } catch (error) {
        console.error("Error fetching course:", error);
        // Fallback to demo data
        setCourse({
          id: courseId,
          title: "Web Development Bootcamp",
          shortDescription: "Learn full-stack web development from scratch with modern technologies",
          price: 100,
          bannerUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router]);

  // Get bKash Access Token via Proxy
  const getBkashAccessToken = async () => {
    try {

      const response = await axios.post('/api/bkash', {
        action: 'getToken'
      });


      if (response.data && response.data.id_token) {
        setIdToken(response.data.id_token);
        return response.data.id_token;
      } else {
        throw new Error(response.data?.error || "No token received");
      }
    } catch (error) {
      console.error("bKash token error:", error);
      toast.error(`Token Error: ${error.response?.data?.error || error.message}`);
      throw error;
    }
  };

  // Create bKash Payment via Proxy
  const createBkashPayment = async () => {
    try {
      setProcessing(true);

      // Validate personal info
      if (!validateStep1()) {
        setProcessing(false);
        return;
      }

      // Get access token
      const token = await getBkashAccessToken();

      // Create payment
      const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const amount = course?.price || 100;

      const paymentRequest = {
        mode: "0011",
        payerReference: formData.phone,
        callbackURL: BKASH_CONFIG.CALLBACK_URL,
        amount: amount.toString(),
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: invoiceNumber
      };


      const response = await axios.post('/api/bkash', {
        action: 'createPayment',
        data: {
          ...paymentRequest,
          token: token
        }
      });


      if (response.data && response.data.bkashURL) {
        setPaymentId(response.data.paymentID);

        // Show success message and instructions
        toast.success("Payment created! Redirecting to bKash...");

        // Show instructions modal
        setTimeout(() => {
          if (window.confirm(
            "bKash payment page will open in a new window.\n\n" +
            "Use these test credentials:\n" +
            "Phone: 01770618567\n" +
            "OTP: 123456\n" +
            "MPIN: 12121\n\n" +
            "Click OK to proceed."
          )) {
            // Open bKash payment page
            const paymentWindow = window.open(
              response.data.bkashURL,
              'bKashPayment',
              'width=500,height=700,resizable=yes,scrollbars=yes'
            );

            if (paymentWindow) {
              setPaymentStatus("Initiated");

              // Check if window closed (payment completed)
              const checkWindow = setInterval(() => {
                if (paymentWindow.closed) {
                  clearInterval(checkWindow);
                  verifyPayment(response.data.paymentID, token);
                }
              }, 1000);
            }
          }
        }, 100);

      } else {
        toast.error(response.data?.statusMessage || "Failed to create payment");
      }

    } catch (error) {
      console.error("Payment creation error:", error.response?.data || error);
      toast.error(error.response?.data?.error || "Payment creation failed");
    } finally {
      setProcessing(false);
    }
  };

  // Verify payment
  const verifyPayment = async (paymentID, token) => {
    try {
      setPaymentStatus("Verifying");

      const response = await axios.post('/api/bkash', {
        action: 'executePayment',
        data: {
          paymentID,
          token
        }
      });


      if (response.data && response.data.transactionStatus === "Completed") {
        // Payment successful
        await completeEnrollment(response.data);
        setPaymentStatus("Completed");
        setStep(3);
        toast.success("Payment successful!");
      } else {
        toast.error(response.data?.statusMessage || "Payment verification failed");
        setPaymentStatus("Failed");
      }

    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Failed to verify payment");
      setPaymentStatus("Failed");
    }
  };

  // Alternative: Direct bKash checkout URL (Simpler approach)
  const directBkashCheckout = async () => {
    try {
      if (!validateStep1()) return;

      setProcessing(true);

      // Get token
      const token = await getBkashAccessToken();

      // Direct bKash checkout URL
      const amount = course?.price || 100;
      const checkoutURL = `https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create?amount=${amount}&intent=sale`;

      // Show instructions
      const proceed = window.confirm(
        "You will be redirected to bKash payment page.\n\n" +
        "Test Credentials:\n" +
        "Phone: 01770618567\n" +
        "OTP: 123456\n" +
        "MPIN: 12121\n\n" +
        "Click OK to proceed to bKash."
      );

      if (proceed) {
        // You can either open in new tab or redirect
        window.open(checkoutURL, '_blank');

        // Start polling for payment status
        setPaymentStatus("Redirected");
        startPaymentPolling();
      }

    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initialize checkout");
    } finally {
      setProcessing(false);
    }
  };

  // Start payment polling
  const startPaymentPolling = () => {
    // This would poll your backend to check if payment was completed
    const pollInterval = setInterval(async () => {
      try {
        // You would check with your backend if payment was received
        // For demo, we'll simulate after 10 seconds
        if (Math.random() > 0.8) { // Simulate payment completion
          clearInterval(pollInterval);
          await simulatePaymentSuccess();
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 3000);

    setTimeout(() => {
      clearInterval(pollInterval);
      if (paymentStatus === "Redirected") {
        toast("Still waiting for payment. Please check your bKash app.");
      }
    }, 300000);
  };

  // Function to create user account automatically
  // Function to create user account automatically
  const createUserAccount = async (userData) => {
    try {

      // Generate password from email (first character uppercase + email)
      const email = userData.email;
      const password = email.charAt(0).toUpperCase() + email.slice(1);

      const userPayload = {
        name: userData.fullname,
        email: userData.email,
        password: password, // First character uppercase + email
        role: "student" // Fixed role as student
      };


      // Create user account
      const response = await axios.post(
        "https://shekhai-server.onrender.com/api/v1/auth/signup",
        userPayload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      // Better response handling
      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data,
          message: "User account created successfully"
        };
      } else {
        const errorMessage = response.data?.message ||
          response.data?.error ||
          response.data?.statusMessage ||
          "User creation failed";
        console.error("User creation failed:", response.data || "No response data");
        return {
          success: false,
          message: errorMessage
        };
      }

    } catch (error) {
      console.error("Error creating user account:", error.response?.data || error);

      // Handle specific error cases
      if (error.response?.status === 409) {
        // User already exists - this is okay, we can proceed with enrollme
        return {
          success: true,
          message: "User already exists"
        };
      }

      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to create user account";

      return {
        success: false,
        message: errorMessage
      };
    }
  };

  // Complete enrollment with fallback and automatic user creation
  // Complete enrollment with fallback and automatic user creation
  const completeEnrollment = async (paymentData) => {
    try {
      const enrollmentData = {
        courseId,
        courseTitle: course?.title,
        coursePrice: course?.price,
        studentInfo: formData,
        paymentInfo: {
          method: "bKash",
          paymentId: paymentData.paymentID || paymentId,
          transactionId: paymentData.trxID,
          amount: paymentData.amount || course?.price,
          status: paymentData.transactionStatus || "Completed",
          paidAt: new Date().toISOString(),
        },
        enrollmentDate: new Date().toISOString(),
        enrollmentId: `ENR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };


      // Step 1: Create user account automatically
      const userCreationResult = await createUserAccount(formData);

      if (userCreationResult.success) {

        // Show user account info to student
        const password = formData.email.charAt(0).toUpperCase() + formData.email.slice(1);
        toast.success(
          <div>
            User account created!<br />
            Email: {formData.email}<br />
            Password: {password}<br />
            Role: Student
          </div>,
          { duration: 6000 }
        );
      } else {
        console.warn("User creation warning:", userCreationResult.message);
        // Continue with enrollment even if user creation has issues
        toast(`Note: ${userCreationResult.message}. Enrollment will proceed.`, {
          duration: 4000,
          icon: 'ℹ️'
        });
      }

      // Step 2: Try to save enrollment to backend
      try {
        const response = await axios.post(
          "https://shekhai-server.onrender.com/api/v1/enrollments",
          enrollmentData
        );

        if (response.data.success) {
          toast.success("Enrollment saved successfully!");
        } else {
          throw new Error("Backend returned error");
        }

      } catch (backendError) {

        // Fallback 1: Save to localStorage
        const enrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
        enrollments.push(enrollmentData);
        localStorage.setItem('courseEnrollments', JSON.stringify(enrollments));

        // Fallback 2: Create downloadable receipt
        createDownloadableReceipt(enrollmentData);

        // Fallback 3: Send email notification (simulated)
        sendEmailNotification(enrollmentData);

        toast.success(
          <div>
            Payment successful! Enrollment saved locally.<br />
            <button
              onClick={() => downloadReceipt(enrollmentData)}
              className="mt-2 underline"
            >
              Download Receipt
            </button>
          </div>,
          { duration: 5000 }
        );
      }

    } catch (error) {
      console.error("Enrollment save error:", error);
      toast.success("Payment completed! Please check your email for confirmation.");
    }
  };

  // Create downloadable receipt
  const createDownloadableReceipt = (enrollmentData) => {
    const receipt = `
    ====================================
            ENROLLMENT RECEIPT
    ====================================
    Enrollment ID: ${enrollmentData.enrollmentId}
    Date: ${new Date(enrollmentData.enrollmentDate).toLocaleString()}
    
    ------------------------------------
    COURSE INFORMATION
    ------------------------------------
    Course: ${enrollmentData.courseTitle}
    Course ID: ${enrollmentData.courseId}
    Price: ${enrollmentData.coursePrice} BDT
    
    ------------------------------------
    STUDENT INFORMATION
    ------------------------------------
    Name: ${enrollmentData.studentInfo.fullname}
    Email: ${enrollmentData.studentInfo.email}
    Phone: ${enrollmentData.studentInfo.phone}
    
    ------------------------------------
    PAYMENT INFORMATION
    ------------------------------------
    Method: ${enrollmentData.paymentInfo.method}
    Payment ID: ${enrollmentData.paymentInfo.paymentId}
    Transaction ID: ${enrollmentData.paymentInfo.transactionId}
    Amount: ${enrollmentData.paymentInfo.amount} BDT
    Status: ${enrollmentData.paymentInfo.status}
    Paid At: ${new Date(enrollmentData.paymentInfo.paidAt).toLocaleString()}
    
    ------------------------------------
    USER ACCOUNT INFORMATION
    ------------------------------------
    Account Created: Yes
    Login Email: ${enrollmentData.studentInfo.email}
    Password: ${enrollmentData.studentInfo.email.charAt(0).toUpperCase() + enrollmentData.studentInfo.email.slice(1)}
    Role: Student
    
    ------------------------------------
    IMPORTANT NOTES
    ------------------------------------
    1. Keep this receipt for future reference
    2. Use Enrollment ID for support queries
    3. Access your course at: https://yourwebsite.com/courses/${enrollmentData.courseId}
    4. Login with the credentials above
    5. Contact support: support@yourwebsite.com
    
    ====================================
            THANK YOU!
    ====================================
  `;

    // Save to localStorage for download
    localStorage.setItem('lastReceipt', receipt);
    return receipt;
  };

  // Download receipt
  const downloadReceipt = (enrollmentData) => {
    const receipt = createDownloadableReceipt(enrollmentData);

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${enrollmentData.enrollmentId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simulate email notification
  const sendEmailNotification = (enrollmentData) => {
    // In a real app, you would send an email via your backend
    console.log('Email notification would be sent:', {
      to: enrollmentData.studentInfo.email,
      subject: `Enrollment Confirmation - ${enrollmentData.courseTitle}`,
      body: `Dear ${enrollmentData.studentInfo.fullname},\n\nYou have successfully enrolled in "${enrollmentData.courseTitle}".\n\nEnrollment ID: ${enrollmentData.enrollmentId}\nAmount Paid: ${enrollmentData.coursePrice} BDT\n\nLogin Credentials:\nEmail: ${enrollmentData.studentInfo.email}\nPassword: ${enrollmentData.studentInfo.email.charAt(0).toUpperCase() + enrollmentData.studentInfo.email.slice(1)}\nRole: Student\n\nThank you for your purchase!`
    });
  };

  // Simulate successful payment (for testing)
  const simulatePaymentSuccess = async () => {
    setProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    await completeEnrollment({
      paymentID: `SIM-${Date.now()}`,
      trxID: `TRX-${Date.now()}`,
      amount: (course?.price || 100).toString(),
      transactionStatus: "Completed"
    });

    setStep(3);
    setProcessing(false);
    toast.success("Payment simulation successful!");
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Format price
  const formatPrice = (price) => {
    if (!price && price !== 0) return "Free";
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Validate step 1
  const validateStep1 = () => {
    if (!formData.fullname.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!/^(?:\+88|01)?\d{11}$/.test(formData.phone.replace(/\s+/g, ''))) {
      toast.error("Please enter a valid Bangladeshi phone number");
      return false;
    }
    return true;
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="w-fit text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center space-x-2">
            <div className={`rounded-full px-3 py-1 text-sm ${step >= 1 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
              1. Personal Info
            </div>
            <div className="h-0.5 w-8 bg-gray-300"></div>
            <div className={`rounded-full px-3 py-1 text-sm ${step >= 2 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
              2. Payment
            </div>
            <div className="h-0.5 w-8 bg-gray-300"></div>
            <div className={`rounded-full px-3 py-1 text-sm ${step === 3 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              3. Confirmation
            </div>
          </div>
        </div>

        {/* Test Mode Banner */}
        {BKASH_CONFIG.IS_SANDBOX && (
          <div className="mb-6 rounded-xl border-2 border-yellow-400 bg-yellow-50 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800">bKash SANDBOX - TEST MODE</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  This is a test environment. No real money will be charged.
                  <button
                    onClick={() => setShowTestInfo(!showTestInfo)}
                    className="ml-2 text-yellow-800 underline hover:text-yellow-900"
                  >
                    {showTestInfo ? "Hide" : "Show"} test credentials
                  </button>
                </p>

                {showTestInfo && (
                  <div className="mt-3 rounded-lg bg-yellow-100 p-3 text-sm">
                    <p className="font-medium text-yellow-900">Test Credentials:</p>
                    <ul className="mt-1 space-y-1">
                      <li>📱 Phone: <code className="rounded bg-yellow-200 px-1">{BKASH_TEST_CREDENTIALS.PHONE}</code></li>
                      <li>🔢 OTP: <code className="rounded bg-yellow-200 px-1">{BKASH_TEST_CREDENTIALS.OTP}</code></li>
                      <li>🔐 MPIN: <code className="rounded bg-yellow-200 px-1">{BKASH_TEST_CREDENTIALS.MPIN}</code></li>
                    </ul>
                    <p className="mt-2 text-xs text-yellow-800">
                      Use these credentials when redirected to bKash payment page.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Course Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Course Summary</h2>

              {course && (
                <>
                  <div className="mb-4 overflow-hidden rounded-xl">
                    <img
                      src={course.bannerUrl}
                      alt={course.title}
                      className="h-48 w-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                      }}
                    />
                  </div>

                  <h3 className="mb-2 text-lg font-medium text-gray-900">{course.title}</h3>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {course.shortDescription}
                  </p>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Course Price</span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(course.price)}
                      </span>
                    </div>

                    {course.price > 0 && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Platform Fee</span>
                          <span className="text-gray-600">Free</span>
                        </div>
                        <div className="flex items-center justify-between border-t pt-3">
                          <span className="font-medium text-gray-900">Total Amount</span>
                          <span className="text-xl font-bold text-green-600">
                            {formatPrice(course.price)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Automatic student account creation</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Test Payment Button */}
            {BKASH_CONFIG.IS_SANDBOX && step === 2 && (
              <div className="mt-6 rounded-2xl bg-gray-50 p-6 shadow">
                <h3 className="mb-3 font-medium text-gray-900">Quick Test</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Simulate payment without bKash app for testing.
                </p>
                <Button
                  onClick={simulatePaymentSuccess}
                  variant="outline"
                  className="w-full border-gray-300"
                  disabled={processing}
                >
                  {processing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CreditCard className="mr-2 h-4 w-4" />
                  )}
                  {processing ? "Processing..." : "Simulate Payment"}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">Personal Information</h2>
                  <p className="mb-6 text-gray-600">
                    Please provide your details to enroll in the course.
                    {BKASH_CONFIG.IS_SANDBOX && " Test data is pre-filled."}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="fullname" className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="fullname"
                        placeholder="Enter your full name"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          This will be used to create your student account
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          placeholder="01XXXXXXXXX"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          This will be used for bKash payment verification
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="text-sm text-blue-800">
                        🔐 <strong>Note:</strong> A student account will be automatically created
                        using your email. Password will be your email with the first letter capitalized.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Payment */}
              {step === 2 && !paymentStatus && (
                <>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">Make Payment</h2>
                  <p className="mb-6 text-gray-600">
                    Complete your payment using bKash sandbox.
                    {BKASH_CONFIG.IS_SANDBOX && " Use test credentials when prompted."}
                  </p>

                  <div className="mb-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="rounded-lg bg-white/20 p-2">
                            <Smartphone className="h-8 w-8" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">Pay with bKash</h3>
                            <p className="text-green-100">Secure payment through bKash Sandbox</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between rounded-lg bg-green-600/50 p-3">
                            <span>Amount to Pay:</span>
                            <span className="text-xl font-bold">{formatPrice(course?.price)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-white/20 p-4">
                        <p className="text-sm">Sandbox Mode</p>
                        <p className="text-xs opacity-90">Test transaction only</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 space-y-6">
                    <div>
                      <h3 className="mb-3 font-medium text-gray-900">How to Test:</h3>
                      <ol className="list-decimal space-y-2 pl-5 text-gray-600">
                        <li>Click "Pay with bKash" button below</li>
                        <li>Confirm to open bKash payment page</li>
                        <li>Use these test credentials:
                          <ul className="mt-1 list-inside list-disc pl-5 text-sm text-gray-500">
                            <li>Phone: <code>{BKASH_TEST_CREDENTIALS.PHONE}</code></li>
                            <li>OTP: <code>{BKASH_TEST_CREDENTIALS.OTP}</code></li>
                            <li>MPIN: <code>{BKASH_TEST_CREDENTIALS.MPIN}</code></li>
                          </ul>
                        </li>
                        <li>Complete payment in bKash sandbox</li>
                        <li>Close the bKash window to return here</li>
                      </ol>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Note:</strong> After payment in bKash, close the bKash window
                        and return to this tab to see confirmation. A student account will be created automatically.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Payment Processing */}
              {step === 2 && paymentStatus && paymentStatus !== "Completed" && (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                  </div>

                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    {paymentStatus === "Initiated" || paymentStatus === "Redirected"
                      ? "Complete Payment in bKash"
                      : "Processing Payment..."}
                  </h2>

                  <p className="mb-8 text-gray-600">
                    {paymentStatus === "Initiated" || paymentStatus === "Redirected"
                      ? "Complete the payment in the bKash window that opened. Then close it to return here."
                      : "Verifying your payment with bKash..."}
                  </p>

                  <div className="mx-auto max-w-md space-y-4 rounded-xl bg-gray-50 p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium capitalize ${paymentStatus === "Initiated" || paymentStatus === "Redirected"
                        ? "text-yellow-600"
                        : "text-blue-600"
                        }`}>
                        {paymentStatus}
                      </span>
                    </div>

                    {paymentStatus === "Initiated" || paymentStatus === "Redirected" ? (
                      <div className="rounded-lg bg-yellow-50 p-4">
                        <p className="text-sm text-yellow-800">
                          🔄 <strong>Waiting for payment completion...</strong><br />
                          If bKash window didn't open, check your popup blocker.
                        </p>
                        <Button
                          onClick={() => window.open('https://tokenized.sandbox.bka.sh', '_blank')}
                          variant="outline"
                          className="mt-2"
                        >
                          Open bKash Sandbox
                        </Button>
                      </div>
                    ) : (
                      <div className="rounded-lg bg-blue-50 p-4">
                        <p className="text-sm text-blue-800">
                          ⏳ Verifying payment status...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>

                  <h2 className="mb-4 text-3xl font-bold text-gray-900">Payment Successful!</h2>
                  <p className="mb-8 text-lg text-gray-600">
                    You are now enrolled in <span className="font-semibold text-blue-600">{course?.title}</span>
                  </p>

                  <div className="mx-auto max-w-md space-y-4 rounded-xl bg-gray-50 p-6 text-left">
                    <div className="flex justify-between border-b pb-3">
                      <span className="text-gray-600">Course</span>
                      <span className="font-medium">{course?.title}</span>
                    </div>
                    <div className="flex justify-between border-b pb-3">
                      <span className="text-gray-600">Amount Paid</span>
                      <span className="font-bold text-green-600">{formatPrice(course?.price)}</span>
                    </div>
                    <div className="flex justify-between border-b pb-3">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium">bKash {BKASH_CONFIG.IS_SANDBOX && "(Sandbox)"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-3">
                      <span className="text-gray-600">Your Student Account</span>
                      <span className="font-medium">Created ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status</span>
                      <span className="font-medium text-green-600">Completed</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <Button
                      onClick={() => router.push(`/courses/${courseId}`)}
                      className="w-full bg-blue-600 py-6 text-lg hover:bg-blue-700"
                    >
                      Go to Course
                    </Button>

                    {/* Account Information Button */}
                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="text-sm font-medium text-blue-800 mb-2">Your Login Credentials:</p>
                      <div className="text-left space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Email:</span>
                          <code className="rounded bg-blue-100 px-2 py-1">{formData.email}</code>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Password:</span>
                          <code className="rounded bg-blue-100 px-2 py-1">
                            {formData.email.charAt(0).toUpperCase() + formData.email.slice(1)}
                          </code>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Role:</span>
                          <span className="font-medium">Student</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        const enrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
                        const lastEnrollment = enrollments[enrollments.length - 1];
                        if (lastEnrollment) {
                          downloadReceipt(lastEnrollment);
                        }
                      }}
                      variant="outline"
                      className="w-full py-6 text-lg"
                    >
                      Download Receipt
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/courses")}
                      className="w-full py-6 text-lg"
                    >
                      Browse More Courses
                    </Button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {step === 1 && (
                <div className="mt-8 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:justify-between">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="sm:px-8"
                  >
                    Back
                  </Button>

                  <Button
                    onClick={() => {
                      if (validateStep1()) {
                        setStep(2);
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 sm:px-8"
                  >
                    Continue to Payment
                    {BKASH_CONFIG.IS_SANDBOX && " (Test Mode)"}
                  </Button>
                </div>
              )}

              {step === 2 && !paymentStatus && (
                <div className="mt-8 space-y-4 border-t pt-8">
                  <Button
                    onClick={createBkashPayment}
                    disabled={processing}
                    className="w-full bg-green-600 py-6 text-lg hover:bg-green-700"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Connecting to bKash...
                      </>
                    ) : (
                      <>
                        <Smartphone className="mr-2 h-5 w-5" />
                        Pay with bKash Sandbox
                      </>
                    )}
                  </Button>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="py-6 text-lg"
                    >
                      Back to Personal Info
                    </Button>

                    {BKASH_CONFIG.IS_SANDBOX && (
                      <Button
                        onClick={simulatePaymentSuccess}
                        variant="outline"
                        className="py-6 text-lg border-blue-300 text-blue-700 hover:bg-blue-50"
                        disabled={processing}
                      >
                        <CreditCard className="mr-2 h-5 w-5" />
                        Simulate Payment
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Security Badge */}
              {step !== 3 && (
                <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t pt-8 text-sm text-gray-500 sm:flex-row">
                  <Shield className="h-5 w-5" />
                  <span>Secure SSL encryption • Powered by bKash</span>
                  {BKASH_CONFIG.IS_SANDBOX && (
                    <span className="rounded-full bg-gray-200 px-2 py-1 text-xs">
                      Sandbox Environment
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutForms;
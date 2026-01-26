"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, Shield, Smartphone, Loader2, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

// bKash API Configuration (Replace with your actual credentials)
const BKASH_CONFIG = {
  SANDBOX_BASE_URL: "https://checkout.sandbox.bka.sh/v1.2.0-beta",
  LIVE_BASE_URL: "https://checkout.pay.bka.sh/v1.2.0-beta",
  
  // You'll get these from bKash merchant portal
  APP_KEY: process.env.NEXT_PUBLIC_BKASH_APP_KEY || "your_app_key_here",
  APP_SECRET: process.env.NEXT_PUBLIC_BKASH_APP_SECRET || "your_app_secret_here",
  USERNAME: process.env.NEXT_PUBLIC_BKASH_USERNAME || "your_username",
  PASSWORD: process.env.NEXT_PUBLIC_BKASH_PASSWORD || "your_password",
  
  // Use sandbox for testing, live for production
  IS_SANDBOX: process.env.NEXT_PUBLIC_BKASH_SANDBOX === "true",
  
  // Callback URLs (configure in bKash merchant portal)
  SUCCESS_URL: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
  FAIL_URL: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/failed`,
  CANCEL_URL: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
};

const CheckoutForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Personal Info, 2: Payment, 3: Success
  const [paymentId, setPaymentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  const courseId = searchParams.get("course");

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        toast.error("No course selected");
        router.push("/courses");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://shekhai-server.onrender.com/api/v1/courses/${courseId}`
        );
        
        if (response.data.success) {
          setCourse(response.data.course || response.data.data);
        } else {
          toast.error("Course not found");
          router.push("/courses");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Error loading course details");
        router.push("/courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return "Free";
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Step 1: Validate personal info
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

  // Step 1: Get bKash Access Token
  const getBkashAccessToken = async () => {
    try {
      const response = await axios.post(
        `${BKASH_CONFIG.IS_SANDBOX ? BKASH_CONFIG.SANDBOX_BASE_URL : BKASH_CONFIG.LIVE_BASE_URL}/checkout/token/grant`,
        {
          app_key: BKASH_CONFIG.APP_KEY,
          app_secret: BKASH_CONFIG.APP_SECRET,
        },
        {
          headers: {
            username: BKASH_CONFIG.USERNAME,
            password: BKASH_CONFIG.PASSWORD,
            "Content-Type": "application/json",
          },
        }
      );
      
      return response.data.id_token;
    } catch (error) {
      console.error("bKash token error:", error);
      throw new Error("Failed to get bKash access token");
    }
  };

  // Step 2: Create bKash Payment
  const createBkashPayment = async () => {
    try {
      setProcessing(true);
      
      // Validate personal info first
      if (!validateStep1()) {
        setProcessing(false);
        return;
      }

      // Get access token
      const token = await getBkashAccessToken();
      
      // Generate unique invoice
      const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Create payment request
      const paymentRequest = {
        amount: course?.price || 0,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: invoiceNumber,
        payerReference: formData.phone,
        callbackURL: BKASH_CONFIG.SUCCESS_URL,
      };

      const response = await axios.post(
        `${BKASH_CONFIG.IS_SANDBOX ? BKASH_CONFIG.SANDBOX_BASE_URL : BKASH_CONFIG.LIVE_BASE_URL}/checkout/payment/create`,
        paymentRequest,
        {
          headers: {
            Authorization: token,
            "X-APP-Key": BKASH_CONFIG.APP_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.paymentID) {
        setPaymentId(response.data.paymentID);
        
        // Redirect to bKash payment page
        if (response.data.bkashURL) {
          window.location.href = response.data.bkashURL;
        } else {
          // Manual redirect if URL not provided
          const bkashURL = BKASH_CONFIG.IS_SANDBOX 
            ? `https://checkout.sandbox.bka.sh/v1.2.0-beta/checkout/payment/execute/${response.data.paymentID}`
            : `https://checkout.pay.bka.sh/v1.2.0-beta/checkout/payment/execute/${response.data.paymentID}`;
          
          window.open(bkashURL, '_blank');
        }
        
        // Start polling for payment status
        pollPaymentStatus(response.data.paymentID, token);
        
      } else {
        toast.error("Failed to create bKash payment");
      }
      
    } catch (error) {
      console.error("bKash payment creation error:", error);
      toast.error(error.response?.data?.errorMessage || "Payment creation failed");
    } finally {
      setProcessing(false);
    }
  };

  // Poll payment status
  const pollPaymentStatus = async (paymentID, token) => {
    try {
      const response = await axios.post(
        `${BKASH_CONFIG.IS_SANDBOX ? BKASH_CONFIG.SANDBOX_BASE_URL : BKASH_CONFIG.LIVE_BASE_URL}/checkout/payment/query`,
        { paymentID },
        {
          headers: {
            Authorization: token,
            "X-APP-Key": BKASH_CONFIG.APP_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.transactionStatus) {
        setPaymentStatus(response.data.transactionStatus);
        
        if (response.data.transactionStatus === "Completed") {
          // Payment successful
          await completeEnrollment(response.data);
        } else if (response.data.transactionStatus === "Failed") {
          toast.error("Payment failed. Please try again.");
        }
        // Continue polling if still pending
        else if (response.data.transactionStatus === "Initiated") {
          setTimeout(() => pollPaymentStatus(paymentID, token), 3000);
        }
      }
    } catch (error) {
      console.error("Payment status polling error:", error);
    }
  };

  // Complete enrollment after successful payment
  const completeEnrollment = async (paymentData) => {
    try {
      // Save enrollment data
      const enrollmentData = {
        courseId,
        courseTitle: course?.title,
        coursePrice: course?.price,
        studentInfo: formData,
        paymentInfo: {
          method: "bKash",
          paymentId: paymentData.paymentID,
          transactionId: paymentData.trxID,
          amount: paymentData.amount,
          status: paymentData.transactionStatus,
          paidAt: new Date().toISOString(),
        },
        enrollmentDate: new Date().toISOString(),
      };

      // Log to console (for testing)
      console.log("=== ENROLLMENT DATA ===", enrollmentData);

      // Here you would save to your backend
      // await axios.post("/api/enrollments", enrollmentData);
      
      toast.success("Payment successful! Enrollment completed.");
      setStep(3);
      
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error("Enrollment failed. Please contact support.");
    }
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
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900"
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
              2. bKash Payment
            </div>
            <div className="h-0.5 w-8 bg-gray-300"></div>
            <div className={`rounded-full px-3 py-1 text-sm ${step === 3 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              3. Confirmation
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Course Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Course Summary</h2>
              
              {course && (
                <>
                  <div className="mb-4 overflow-hidden rounded-xl">
                    <img
                      src={course.bannerUrl || "/placeholder-image.jpg"}
                      alt={course.title}
                      className="h-48 w-full object-cover"
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
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">Personal Information</h2>
                  <p className="mb-6 text-gray-600">Please provide your details to enroll in the course.</p>
                  
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
                  </div>
                </>
              )}

              {/* Step 2: bKash Payment */}
              {step === 2 && !paymentStatus && (
                <>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">bKash Payment</h2>
                  <p className="mb-6 text-gray-600">Complete your payment using bKash.</p>
                  
                  <div className="mb-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="mb-4 flex items-center gap-3">
                          <div className="rounded-lg bg-white/20 p-2">
                            <Smartphone className="h-8 w-8" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">Pay with bKash</h3>
                            <p className="text-green-100">Secure payment through bKash</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between rounded-lg bg-green-600/50 p-3">
                            <span>Amount to Pay:</span>
                            <span className="text-xl font-bold">{formatPrice(course?.price)}</span>
                          </div>
                          
                          {BKASH_CONFIG.IS_SANDBOX && (
                            <div className="rounded-lg bg-yellow-600/50 p-3 text-sm">
                              ⚠️ <strong>TEST MODE</strong> - Using bKash Sandbox for testing
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8 space-y-4">
                    <h3 className="font-medium text-gray-900">Payment Instructions:</h3>
                    <ol className="list-decimal space-y-2 pl-5 text-gray-600">
                      <li>Click "Proceed to bKash Payment" button</li>
                      <li>You'll be redirected to bKash payment page</li>
                      <li>Enter your bKash PIN to complete payment</li>
                      <li>Return to this page after successful payment</li>
                    </ol>
                  </div>
                </>
              )}

              {/* Payment Processing */}
              {step === 2 && paymentStatus && paymentStatus !== "Completed" && (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                  </div>
                  
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">Processing Payment...</h2>
                  <p className="mb-8 text-gray-600">
                    Please wait while we verify your payment with bKash.
                  </p>
                  
                  <div className="mx-auto max-w-md space-y-3 rounded-xl bg-gray-50 p-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium capitalize">{paymentStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment ID:</span>
                      <span className="font-mono text-sm">{paymentId}</span>
                    </div>
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
                      <span className="font-medium">bKash</span>
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
                    <Button 
                      variant="outline"
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
                <div className="mt-8 flex justify-between border-t pt-8">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="px-8"
                  >
                    Back
                  </Button>
                  
                  <Button
                    onClick={() => {
                      if (validateStep1()) {
                        setStep(2);
                      }
                    }}
                    className="px-8 bg-green-600 hover:bg-green-700"
                  >
                    Proceed to bKash Payment
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
                      "Proceed to bKash Payment"
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="w-full py-6 text-lg"
                  >
                    Back to Personal Info
                  </Button>
                </div>
              )}

              {/* Security Badge */}
              {step !== 3 && (
                <div className="mt-8 flex items-center justify-center gap-4 border-t pt-8 text-sm text-gray-500">
                  <Shield className="h-5 w-5" />
                  <span>Secure SSL encryption • Powered by bKash</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Link from "next/link";
import StepIndicator from "@/components/join-studybit/StepIndicator";
import QuestionSection from "@/components/join-studybit/QuestionSection";
import ProgressBar from "@/components/join-studybit/ProgressBar";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export default function Page() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  
  // User info state
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // State for "Other" inputs
  const [otherArea, setOtherArea] = useState("");
  const [otherGoal, setOtherGoal] = useState("");

  const allQuestions = {
    1: [
      {
        number: 1,
        question: "Which area are you most interested in?",
        options: [
          "Web Development",
          "Small Business Management",
          "Graphic Design",
          "Fitness & Personal Training",
          "Cooking & Baking",
          "UI/UX Design",
          "Machine Learning / AI",
          "Urban Farming",
          "Robotics",
          "Tailoring & Sewing",
          "Poultry Farming",
          "Cattle Farming",
          "Other",
        ],
      },
    ],
    2: [
      {
        number: 2,
        question: "What is your current skill level?",
        options: ["Beginner", "Intermediate", "Advanced"],
      },
      {
        number: 3,
        question: "What is your learning goal?",
        options: [
          "Get a new job",
          "Start a business",
          "Freelance work",
          "Personal hobby or improvement",
          "Academic improvement",
          "Other",
        ],
      },
    ],
    3: [
      {
        number: 4,
        question: "How much time can you dedicate to learning per week?",
        options: ["0-5 hours", "5-10 hours", "10-20 hours", "20+ hours"],
      },
      {
        number: 5,
        question: "What is your preferred learning style?",
        options: [
          "Video tutorials",
          "Reading materials",
          "Practice exercises",
          "Interactive sessions",
          "One-on-one mentoring",
        ],
      },
    ],
    4: [
      {
        number: 6,
        question: "When would you like to start?",
        options: [
          "Immediately",
          "Within a week",
          "Within a month",
          "Not sure yet",
        ],
      },
    ],
  };

  const steps = [
    { label: "Step 1", status: "pending" },
    { label: "Step 2", status: "pending" },
    { label: "Step 3", status: "pending" },
    { label: "Final", status: "pending" },
  ].map((step, index) => ({
    ...step,
    status: isSubmitted
      ? "completed"
      : index + 1 < currentStep
        ? "completed"
        : index + 1 === currentStep
          ? "in-progress"
          : "pending",
  }));

  const handleOptionSelect = (questionNumber, option, isChecked) => {
    setAnswers((prev) => {
      if (isChecked) {
        return {
          ...prev,
          [questionNumber]: [option],
        };
      } else {
        const newAnswers = { ...prev };
        delete newAnswers[questionNumber];
        return newAnswers;
      }
    });

    // Reset "Other" fields when changing selection
    if (questionNumber === 1 && option !== "Other") {
      setOtherArea("");
    }
    if (questionNumber === 3 && option !== "Other") {
      setOtherGoal("");
    }
  };

  const handleUserInfoChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const isUserInfoComplete = () => {
    return userInfo.name.trim() && userInfo.email.trim() && userInfo.phone.trim();
  };

  const isStepComplete = (step) => {
    const questions = allQuestions[step] || [];
    return questions.every(q => {
      const answer = answers[q.number];
      if (!answer || answer.length === 0) return false;
      
      // Special validation for "Other" fields
      if (q.number === 1 && answer[0] === "Other" && !otherArea.trim()) {
        return false;
      }
      if (q.number === 3 && answer[0] === "Other" && !otherGoal.trim()) {
        return false;
      }
      
      return true;
    });
  };

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const validatePhone = (phone) => {
    return phone.trim().length >= 10;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate all steps are complete
    if (!isUserInfoComplete()) {
      toast.error('Please fill in your information');
      return;
    }

    if (!validateEmail(userInfo.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!validatePhone(userInfo.phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    // Check if all questions are answered
    const allStepsComplete = [1, 2, 3, 4].every(step => isStepComplete(step));
    if (!allStepsComplete) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    // Prepare data for API - EXACTLY matching Postman format
    const formData = {
      name: userInfo.name.trim(),
      email: userInfo.email.trim().toLowerCase(),
      phone: userInfo.phone.trim(),
      step1: {
        interestedArea: answers[1]?.[0] || '',
        ...(answers[1]?.[0] === 'Other' && { otherArea: otherArea.trim() })
      },
      step2: {
        skillLevel: answers[2]?.[0] || '',
        learningGoal: answers[3]?.[0] || '',
        ...(answers[3]?.[0] === 'Other' && { otherGoal: otherGoal.trim() })
      },
      step3: {
        timeDedication: answers[4]?.[0] || '',
        learningStyle: answers[5]?.[0] || ''
      },
      finalStep: {
        startTime: answers[6]?.[0] || ''
      }
    };


    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/study-bit/submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = data.errors.map(err => err.msg).join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
      }

      if (data.success) {
        setSubmissionId(data.data.id);
        setIsSubmitted(true);
        toast.success('Form submitted successfully!');
        
        // Clear form data
        setAnswers({});
        setUserInfo({ name: "", email: "", phone: "" });
        setOtherArea("");
        setOtherGoal("");
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.message || 'Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProgress = () => {
    const totalQuestions = Object.values(allQuestions).flat().length;
    let answeredCount = 0;
    
    Object.values(allQuestions).flat().forEach((question) => {
      const answer = answers[question.number];
      if (answer && answer.length > 0) {
        // Check if "Other" fields are filled
        if (question.number === 1 && answer[0] === "Other" && !otherArea.trim()) {
          return;
        }
        if (question.number === 3 && answer[0] === "Other" && !otherGoal.trim()) {
          return;
        }
        answeredCount++;
      }
    });

    return Math.round((answeredCount / totalQuestions) * 100);
  };

  // Show success message after submission
  if (isSubmitted) {
    return (
      <main className="page-body container-width">
        <div className="min-h-screen bg-background py-8">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-8 rounded-lg border border-green-500 bg-green-50 p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="mb-2 text-3xl font-bold text-green-700">
                Form Submitted Successfully!
              </h2>
              <p className="mb-4 text-green-600">
                Thank you for completing the questionnaire. We'll get back to you soon!
              </p>
              {submissionId && (
                <p className="text-sm text-gray-600">
                  Submission ID: {submissionId}
                </p>
              )}
              <div className="mt-6 flex gap-4 justify-center">
                <Link href="/">
                  <Button className="rounded px-8">Back to Home</Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="rounded px-8"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                >
                  New Submission
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-body container-width">
      <div className="min-h-screen bg-background py-8">
        <div className="mx-auto max-w-4xl px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-base">
              Welcome to Study Bit
            </h1>
            <p className="text-lg text-gray">We Just Need Some Information</p>
          </div>

          {/* Progress Bar */}
          <ProgressBar percentage={calculateProgress()} />

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} steps={steps} />

          {/* User Info Form - Show on all steps but only editable on step 1 */}
          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => handleUserInfoChange('name', e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-base"
                  disabled={currentStep > 1}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => handleUserInfoChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-base"
                  disabled={currentStep > 1}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                  placeholder="+1 234 567 890"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-base"
                  disabled={currentStep > 1}
                  required
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="mb-8 space-y-4">
            {allQuestions[currentStep]?.map((question) => (
              <div key={question.number}>
                <QuestionSection
                  questionNumber={question.number}
                  question={question.question}
                  options={question.options}
                  selectedOptions={answers[question.number] || []}
                  onOptionSelect={handleOptionSelect}
                />
                
                {/* Show "Other" input field for question 1 */}
                {question.number === 1 && answers[1]?.[0] === "Other" && (
                  <div className="mt-2 ml-8 animate-fadeIn">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Please specify your area of interest
                    </label>
                    <input
                      type="text"
                      value={otherArea}
                      onChange={(e) => setOtherArea(e.target.value)}
                      placeholder="e.g., Blockchain Development, Cloud Computing, etc."
                      className="w-full md:w-1/2 rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-base"
                    />
                  </div>
                )}

                {/* Show "Other" input field for question 3 */}
                {question.number === 3 && answers[3]?.[0] === "Other" && (
                  <div className="mt-2 ml-8 animate-fadeIn">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Please specify your learning goal
                    </label>
                    <input
                      type="text"
                      value={otherGoal}
                      onChange={(e) => setOtherGoal(e.target.value)}
                      placeholder="e.g., Research, Teaching, etc."
                      className="w-full md:w-1/2 rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-base"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              className="rounded px-8"
              onClick={handlePrevious}
              disabled={currentStep === 1 || isLoading}
            >
              Previous
            </Button>
            
            {currentStep === 4 ? (
              <Button
                className="rounded px-8 bg-green-600 hover:bg-green-700"
                onClick={handleSubmit}
                disabled={!isStepComplete(currentStep) || !isUserInfoComplete() || isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            ) : (
              <Button
                className="rounded px-8"
                onClick={handleNext}
                disabled={!isStepComplete(currentStep) || isLoading}
              >
                Next
              </Button>
            )}
          </div>

          {/* Step Completion Indicator */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Step {currentStep} of 4 completed
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </main>
  );
}
"use client";

import ProgressBar from "@/components/Join-studybit/ProgressBar";
import QuestionSection from "@/components/Join-studybit/QuestionSection";
import StepIndicator from "@/components/Join-studybit/StepIndicator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (questionNumber, option, isChecked) => {
    setAnswers((prev) => {
      const currentAnswers = prev[questionNumber] || [];

      if (isChecked) {
        return {
          ...prev,
          [questionNumber]: [...currentAnswers, option],
        };
      } else {
        return {
          ...prev,
          [questionNumber]: currentAnswers.filter((item) => item !== option),
        };
      }
    });
  };

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
          "Other",
          "Cattle Farming",
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
    { label: "Step 1", status: "completed" },
    { label: "Step 2", status: "completed" },
    { label: "Step 3", status: "in-progress" },
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

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === 4 && isAllQuestionsAnswered()) {
      setIsSubmitted(true);
      setCurrentStep(4); // Ensure we're on step 4
      console.log("Form submitted with answers:", answers);
    }
  };

  const isAllQuestionsAnswered = () => {
    return Object.values(allQuestions)
      .flat()
      .every((question) => answers[question.number]?.length > 0);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const calculateProgress = () => {
    const totalQuestions = Object.values(allQuestions).flat().length;
    const answeredQuestionsCount = Object.values(allQuestions)
      .flat()
      .filter((question) => {
        const questionAnswers = answers[question.number];
        return questionAnswers && questionAnswers.length > 0;
      }).length;

    return Math.round((answeredQuestionsCount / totalQuestions) * 100);
  };

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

          {/* Questions or Success Message */}
          {isSubmitted ? (
            <div className="mb-8 rounded-lg border border-green-500 bg-green-50 p-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-green-700">
                Form Submitted Successfully!
              </h2>
              <p className="text-green-600">
                Thank you for completing the questionnaire. We'll get back to
                you soon!
              </p>
            </div>
          ) : (
            <div className="mb-8 space-y-4">
              {allQuestions[currentStep].map((question) => (
                <QuestionSection
                  key={question.number}
                  questionNumber={question.number}
                  question={question.question}
                  options={question.options}
                  selectedOptions={answers[question.number] || []}
                  onOptionSelect={handleOptionSelect}
                />
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          {!isSubmitted ? (
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="rounded px-8"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                className="rounded px-8"
                onClick={handleNext}
                disabled={currentStep === 4 && !isAllQuestionsAnswered()}
              >
                {currentStep === 4 ? "Submit" : "Next"}
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link href="/">
                <Button className="rounded px-8">Back to Home</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

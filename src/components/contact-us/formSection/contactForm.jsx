"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FaCheck, FaSpinner } from "react-icons/fa6"; // Changed from Loader2 to FaSpinner
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

// API base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  // "https://shekhai-server.onrender.com/api/v1";
  "https://shekhai-server.onrender.com/api/v1";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Sending message...");

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(
          "Message sent successfully! We'll get back to you soon.",
          { id: loadingToast },
        );

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "general",
          message: "",
        });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(
        error.message || "Failed to send message. Please try again.",
        { id: loadingToast },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "billing", label: "Billing & Payment" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "partnership", label: "Partnership" },
    { value: "other", label: "Other" },
  ];

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#FFFFFF",
            },
          },
          error: {
            duration: 4000,
          },
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="mt-12 grow rounded-md border p-5 md:mt-0 md:rounded-none md:border-0 md:pr-10"
      >
        <fieldset className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 md:gap-y-14">
          <div>
            <Label
              htmlFor="firstName"
              className="text-sm font-normal text-text-dark"
            >
              First Name *
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="rounded-none border-0 border-b border-[#8D8D8D] p-0 text-gray shadow-none focus-visible:border-stroke focus-visible:ring-0"
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-sm font-normal text-text-dark"
            >
              Last Name *
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="rounded-none border-0 border-b border-[#8D8D8D] p-0 text-gray shadow-none focus-visible:border-stroke focus-visible:ring-0"
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-normal text-text-dark"
            >
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="rounded-none border-0 border-b border-[#8D8D8D] p-0 text-gray shadow-none focus-visible:border-stroke focus-visible:ring-0"
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="text-sm font-normal text-text-dark"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="rounded-none border-0 border-b border-[#8D8D8D] p-0 text-gray shadow-none focus-visible:border-stroke focus-visible:ring-0"
              disabled={isSubmitting}
              placeholder="Optional"
            />
          </div>
        </fieldset>

        <fieldset className="mt-8 md:mt-[47px]">
          <legend className="font-medium text-[#011C2A]">
            Select Subject?
          </legend>
          <RadioGroup
            value={formData.subject}
            onValueChange={(value) => handleInputChange("subject", value)}
            className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
            disabled={isSubmitting}
          >
            {subjectOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="cursor-pointer bg-[#E0E0E0] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-black data-[state=checked]:bg-black data-[state=checked]:text-white"
                >
                  <FaCheck className="text-[.7rem]" />
                </RadioGroupItem>
                <Label
                  htmlFor={option.value}
                  className="cursor-pointer text-sm"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>

        <div className="mt-8 md:mt-[51px]">
          <Label
            htmlFor="message"
            className="[font-size:16px] font-normal text-[#011C2A]"
          >
            Message *
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className="min-h-[120px] rounded-none border-0 border-b border-[#8D8D8D] p-0 text-gray shadow-none focus-visible:border-stroke focus-visible:ring-0 md:mt-3"
            disabled={isSubmitting}
            required
          />
        </div>

        <Button
          type="submit"
          className="mt-8 ml-auto block min-w-[140px] bg-[#234A96] hover:bg-[#234A96]/90 disabled:cursor-not-allowed disabled:opacity-50 md:mt-[3.75rem]"
          disabled={
            isSubmitting ||
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.message
          }
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </>
  );
}

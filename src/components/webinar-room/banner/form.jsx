// components/webinar-room/banner/form.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Users,
  Building,
  GraduationCap,
  BriefcaseBusiness,
  Lightbulb,
  School,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const API_BASE_URL = "https://shekhai-server.onrender.com/api/v1";

// Create a stable InputField component outside to prevent re-renders
const InputField = ({ 
  icon: Icon, 
  label, 
  type = "text", 
  name, 
  value,
  onChange,
  onFocus,
  onBlur,
  required = false,
  loading = false,
  activeField,
  ...props 
}) => (
  <div className="relative mb-6">
    <div className="relative">
      <div
        className={`absolute top-1/2 left-4 -translate-y-1/2 transition-all duration-300 ${
          activeField === name || value
            ? "text-blue-400"
            : "text-gray-400"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        disabled={loading}
        className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-4 pr-4 pl-12 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:bg-gray-900/70 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={label}
        {...props}
      />
      {required && (
        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-500">
          *
        </span>
      )}
    </div>
    <div
      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
        activeField === name ? "w-full" : "w-0"
      }`}
    />
  </div>
);

// Stable RoleOption component
const RoleOption = ({ 
  value, 
  label, 
  icon: Icon, 
  description, 
  selectedRole, 
  onSelect, 
  loading 
}) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className={`group flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all duration-300 ${
      selectedRole === value
        ? "border-blue-500 bg-blue-500/10"
        : "border-gray-700 bg-gray-800/50 hover:border-blue-500/50 hover:bg-gray-800"
    }`}
    disabled={loading}
  >
    <div className={`rounded-lg p-3 transition-all duration-300 ${
      selectedRole === value
        ? "bg-gradient-to-r from-blue-500 to-purple-500"
        : "bg-gray-700 group-hover:bg-blue-500/20"
    }`}>
      <Icon className={`h-6 w-6 ${
        selectedRole === value ? "text-white" : "text-gray-400 group-hover:text-blue-400"
      }`} />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className={`font-semibold ${
          selectedRole === value ? "text-white" : "text-gray-300 group-hover:text-white"
        }`}>
          {label}
        </h4>
        {selectedRole === value && (
          <CheckCircle className="h-5 w-5 text-green-400" />
        )}
      </div>
      <p className="mt-1 text-sm text-gray-400 group-hover:text-gray-300">
        {description}
      </p>
    </div>
  </button>
);

const roleOptions = [
  {
    value: "student",
    label: "Student",
    icon: GraduationCap,
    description: "Currently enrolled in an educational institution",
  },
  {
    value: "professional",
    label: "Working Professional",
    icon: BriefcaseBusiness,
    description: "Currently employed in a professional role",
  },
  {
    value: "entrepreneur",
    label: "Entrepreneur",
    icon: Lightbulb,
    description: "Business owner or startup founder",
  },
  {
    value: "educator",
    label: "Educator",
    icon: School,
    description: "Teacher, professor, or trainer",
  },
  {
    value: "other",
    label: "Other",
    icon: UserCog,
    description: "Other profession or role",
  },
];

export default function Form({ webinar, onRegistrationSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "student",
    organization: "",
    receiveSMS: false,
    receiveEmailUpdates: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [progressWidth, setProgressWidth] = useState("0%");

  // Calculate progress width
  useEffect(() => {
    const calculateProgress = () => {
      const current = webinar?.currentParticipants || 0;
      const max = webinar?.maxParticipants || 100;
      const percentage = Math.min(100, (current / max) * 100);
      setProgressWidth(`${percentage}%`);
    };

    calculateProgress();
    
    const timer = setTimeout(() => {
      calculateProgress();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [webinar]);

  // Use useCallback to prevent function recreation on every render
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleRoleSelect = useCallback((role) => {
    setFormData(prev => ({
      ...prev,
      role,
    }));
  }, []);

  const handleFocus = useCallback((fieldName) => {
    setActiveField(fieldName);
  }, []);

  const handleBlur = useCallback(() => {
    setActiveField(null);
  }, []);

  const validateStep = useCallback((step) => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          setError("Please enter your name");
          return false;
        }
        if (!formData.email.trim()) {
          setError("Please enter your email");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError("Please enter a valid email address");
          return false;
        }
        break;
      case 2:
        if (!formData.role) {
          setError("Please select your role");
          return false;
        }
        break;
      case 3:
        // Organization is optional, so no validation needed
        break;
    }
    setError(null);
    return true;
  }, [formData.name, formData.email, formData.role]);

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => prev - 1);
    setError(null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentStep < 3) {
      nextStep();
      return;
    }

    setLoading(true);
    setError(null);

    const loadingToast = toast.loading(
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        Processing your registration...
      </div>,
    );

    try {
      if (!webinar || !webinar._id) {
        throw new Error("Webinar information is missing");
      }

      const registrationData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || "",
        role: formData.role,
        organization: formData.organization.trim() || "",
        receiveSMS: formData.receiveSMS,
        receiveEmailUpdates: formData.receiveEmailUpdates,
      };

      const response = await fetch(
        `${API_BASE_URL}/webinars/${webinar._id}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        toast.dismiss(loadingToast);
        toast.success(
          <div className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
            <div>
              <p className="font-semibold">Registration Successful!</p>
              <p className="text-sm text-gray-600">
                You're all set for the webinar
              </p>
            </div>
          </div>,
          {
            duration: 5000,
          },
        );

        if (onRegistrationSuccess) {
          onRegistrationSuccess(formData.email);
        }

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          role: "student",
          organization: "",
          receiveSMS: false,
          receiveEmailUpdates: true,
        });
        setCurrentStep(1);

        if (result.data?.registrationId) {
          setTimeout(() => {
            toast(
              `Registration ID: ${result.data.registrationId}`,
              {
                icon: "📧",
                duration: 6000,
              },
            );
          }, 1000);
        }
      } else {
        toast.dismiss(loadingToast);
        if (result.errors) {
          const errorMessages = result.errors.join(", ");
          throw new Error(`Registration Error: ${errorMessages}`);
        }
        throw new Error(result.message || "Failed to register for webinar");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
      toast.error(
        <div className="flex items-start gap-2">
          <span className="text-red-500">✗</span>
          <span>{error.message || "Failed to register"}</span>
        </div>,
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2">
                <User className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Step 1 of 3</span>
              </div>
              <h3 className="text-xl font-bold text-white">Personal Information</h3>
              <p className="mt-2 text-gray-400">Tell us a bit about yourself</p>
            </div>

            <div className="space-y-2">
              <InputField 
                icon={User} 
                label="Full Name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                required
                loading={loading}
                activeField={activeField}
              />
              
              <InputField
                icon={Mail}
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                loading={loading}
                activeField={activeField}
              />
              
              <InputField
                icon={Phone}
                label="Phone Number (Optional)"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
                loading={loading}
                activeField={activeField}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2">
                <BriefcaseBusiness className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Step 2 of 3</span>
              </div>
              <h3 className="text-xl font-bold text-white">Select Your Role</h3>
              <p className="mt-2 text-gray-400">Choose the category that best describes you</p>
            </div>

            <div className="space-y-3">
              {roleOptions.map((option) => (
                <RoleOption 
                  key={option.value} 
                  {...option} 
                  selectedRole={formData.role}
                  onSelect={handleRoleSelect}
                  loading={loading}
                />
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2">
                <Building className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-300">Step 3 of 3</span>
              </div>
              <h3 className="text-xl font-bold text-white">Organization Details</h3>
              <p className="mt-2 text-gray-400">Tell us about your organization (optional)</p>
            </div>

            <div className="space-y-2">
              <InputField
                icon={Building}
                label="Organization/Company Name"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                onFocus={() => handleFocus('organization')}
                onBlur={handleBlur}
                loading={loading}
                activeField={activeField}
              />

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      id="receiveEmailUpdates"
                      checked={formData.receiveEmailUpdates}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-600 bg-gray-800 checked:border-blue-500 checked:bg-gradient-to-r checked:from-blue-500 checked:to-purple-500"
                    />
                    <CheckCircle className="pointer-events-none absolute top-0 left-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                  </div>
                  <label
                    htmlFor="receiveEmailUpdates"
                    className="cursor-pointer text-sm text-gray-300"
                  >
                    I want to receive email updates about this webinar and similar events
                  </label>
                </div>
              </div>

              {/* Summary Preview */}
              <div className="mt-6 rounded-xl border border-gray-700 bg-gray-800/30 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-300">Registration Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="font-medium text-white">{formData.name || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="font-medium text-white">{formData.email || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Role:</span>
                    <span className="font-medium text-white">
                      {roleOptions.find(r => r.value === formData.role)?.label || "Not selected"}
                    </span>
                  </div>
                  {formData.organization && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Organization:</span>
                      <span className="font-medium text-white">{formData.organization}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Decorative Background Elements */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 blur-3xl" />
      <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />
      <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl" />

      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/90 to-gray-900/70 p-8 shadow-2xl backdrop-blur-xl"
      >
        {/* Form Header */}
        {/* <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">
              LIMITED SPOTS AVAILABLE
            </span>
          </div>
        </div> */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-800/50 bg-red-900/20 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-red-500/20 p-1">
                <Lock className="h-4 w-4 text-red-400" />
              </div>
              <div>
                <p className="font-medium text-red-300">Validation Error</p>
                <p className="text-sm text-red-400/80">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Current Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={prevStep}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-700 bg-gray-800/50 py-6 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : currentStep === 3 ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Complete Registration
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Lock className="h-3 w-3" />
          <span>Your information is secure and will never be shared</span>
        </div>
      {/* Registration Counter */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-gray-400">
          <span className="font-semibold text-blue-400">
            {webinar.currentParticipants || 0}
          </span>{" "}
          seats filled
        </div>
        <div className="text-gray-400">
          <span className="font-semibold text-gray-300">
            {webinar.maxParticipants || "∞"}
          </span>{" "}
          total spots
        </div>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-800">
        <div
          style={{
            width: progressWidth,
            transition: "width 1s ease-in-out",
          }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>
      </form>

    </div>
  );
}
import { cn } from "@/lib/utils";
import { User, Mail, MessageSquare, Check } from "lucide-react";

export default function ProgressSteps({ currentStep = 1 }) {
  return (
    <div className="relative mb-12">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        {/* User Info Step */}
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "relative z-10 mb-3 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-300",
              currentStep >= 1
                ? "border-[#234A96] bg-[#234A96]"
                : "border-[rgb(35,74,150,50%)] bg-[#F4F7FD]",
            )}
          >
            {currentStep > 1 ? (
              <Check className="h-7 w-7 text-white" />
            ) : (
              <User className={cn(
                "h-7 w-7",
                currentStep >= 1 ? "text-white" : "text-[#234A96]"
              )} />
            )}
          </div>
          <span className={cn(
            "text-sm font-medium transition-colors",
            currentStep >= 1 ? "text-[#234A96]" : "text-gray-400"
          )}>
            Your Info
          </span>
        </div>

        {/* Question Title Step */}
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "relative z-10 mb-3 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-300",
              currentStep >= 2
                ? "border-[#234A96] bg-[#234A96]"
                : "border-[rgb(35,74,150,50%)] bg-[#F4F7FD]",
            )}
          >
            {currentStep > 2 ? (
              <Check className="h-7 w-7 text-white" />
            ) : (
              <Mail className={cn(
                "h-7 w-7",
                currentStep >= 2 ? "text-white" : "text-[#234A96]"
              )} />
            )}
          </div>
          <span className={cn(
            "text-sm font-medium transition-colors",
            currentStep >= 2 ? "text-[#234A96]" : "text-gray-400"
          )}>
            Question Title
          </span>
        </div>

        {/* Ask Question Step */}
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "relative z-10 mb-3 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-300",
              currentStep >= 3
                ? "border-[#234A96] bg-[#234A96]"
                : "border-[rgb(35,74,150,50%)] bg-[#F4F7FD]",
            )}
          >
            {currentStep > 3 ? (
              <Check className="h-7 w-7 text-white" />
            ) : (
              <MessageSquare className={cn(
                "h-7 w-7",
                currentStep >= 3 ? "text-white" : "text-[#234A96]"
              )} />
            )}
          </div>
          <span className={cn(
            "text-sm font-medium transition-colors",
            currentStep >= 3 ? "text-[#234A96]" : "text-gray-400"
          )}>
            Your Question
          </span>
        </div>
      </div>

      {/* Dotted connector lines */}
      <div className="absolute top-8 left-1/2 w-full max-w-2xl -translate-x-1/2 transform">
        <div className="flex items-center justify-between px-8">
          <div className={cn(
            "mx-8 flex-1 border-t-2 border-dashed transition-colors duration-300",
            currentStep >= 2 ? "border-[#234A96]" : "border-gray-300"
          )}></div>
          <div className={cn(
            "mr-6 flex-1 border-t-2 border-dashed transition-colors duration-300",
            currentStep >= 3 ? "border-[#234A96]" : "border-gray-300"
          )}></div>
        </div>
      </div>
    </div>
  );
}
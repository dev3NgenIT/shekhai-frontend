import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function StepIndicator({ currentStep, steps }) {
  return (
    <div className="my-16 w-full">
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-4 right-0 left-0 z-0 h-px bg-muted">
          <div
            className="h-full bg-base transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative z-10 flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-background"
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                  step.status === "completed" &&
                    "bg-step-complete border-step-complete bg-base text-white",
                  step.status === "in-progress" &&
                    "bg-step-active border-step-active text-white",
                  step.status === "pending" &&
                    "bg-step-pending border-step-pending text-white",
                )}
              >
                {step.status === "completed" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="mt-2 px-2 text-center">
                <div className="text-sm font-medium text-foreground">
                  {step.label}
                </div>
                <div
                  className={cn(
                    "text-xs capitalize",
                    step.status === "completed" && "text-step-complete",
                    step.status === "in-progress" && "text-step-active",
                    step.status === "pending" && "text-muted-foreground",
                  )}
                >
                  {step.status === "in-progress" ? "In Progress" : step.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

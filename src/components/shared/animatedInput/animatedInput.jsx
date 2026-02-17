
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function AnimatedInput({
  className,
  state,
  sequence,
  setState,
  onSubmit,
}) {
  const [hasFocused, setHasFocused] = useState(false);

  return (
    <div
      className={cn(
        "relative mx-auto mt-11 flex h-14 justify-center rounded-full bg-white md:w-[32.125rem]",
        className,
      )}
    >
      <Input
        className="absolute top-0 left-0 z-1 h-14 rounded-full pr-[7.35rem] pl-5 text-text-dark md:w-[32.125rem] md:pr-[10rem] md:pl-[37px]"
        value={state}
        onFocusCapture={() => setHasFocused(true)}
        onBlur={() => setHasFocused(false)}
        onChange={(e) => setState(e.target.value)}
      />
      <Button
        className="absolute top-0 right-0 z-2 h-14 w-[6.5rem] cursor-pointer rounded-r-full bg-title-light text-sm text-button hover:bg-title-light/90 md:w-[9.625rem]"
        onClick={onSubmit}
      >
        Search Now
      </Button>

      {!hasFocused && !state && (
        <TypeAnimation
          sequence={sequence}
          cursor={true}
          repeat={Infinity}
          style={{
            fontSize: "1em",
            display: "inline-block",
            position: "absolute",
            left: "20px",
            top: "50%",
            translate: "0 -50%",
          }}
          wrapper="div"
        />
      )}
    </div>
  );
}

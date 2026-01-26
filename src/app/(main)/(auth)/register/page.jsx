import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Page() {
  return (
    <section className="container-width page-body relative mt-5 flex h-[calc(712px+64px)]">
      {/* Left Side - Learning Section */}
      <div className="relative hidden w-2/5 shrink-0 flex-col items-center justify-evenly overflow-hidden bg-[linear-gradient(135deg,_#16a085_0%,_#2980b9_50%,_#8e44ad_100%)] p-12 text-white md:flex">
        {/* Noise texture overlay */}
        {/* <div
          className="absolute inset-0 isolate z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "500px 500px",
          }}
        /> */}

        <div className="relative z-10 max-w-md">
          <h1 className="mb-1 text-section-heading">Hello, Learners!</h1>
          <p className="mb-8 max-w-[280px] text-description leading-relaxed font-light opacity-90">
            Welcome aboard! Unlock your journey to knowledge and skills with
            just one step. Sign up and start learning today.
          </p>
        </div>

        {/* Character illustration */}
        <Image
          src={"/registration-banner.png"}
          alt="Learning character sitting on books with laptop"
          width={277}
          height={470}
          className="h-[470px] w-[277px]"
        />
      </div>

      {/* Right Side - Form Section */}
      <div className="right-0 flex w-full items-center justify-center bg-gray-50 p-8 md:absolute md:w-[62.5%] md:rounded-l-4xl">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-right">
            <span className="mr-4 text-sm text-gray-600">
              <span className="cursor-pointer text-base underline">Signup</span>
            </span>
            <Link
              href={"/login"}
              className="cursor-pointer text-sm text-gray-600"
            >
              Login
            </Link>
          </div>

          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="p-0">
              <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
                Create Account
              </h2>

              <form className="space-y-4">
                {/* Name fields */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="First Name"
                      className="h-12 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 placeholder:text-gray-500"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Last Name"
                      className="h-12 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <Input
                  type="email"
                  placeholder="Email"
                  className="h-12 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 placeholder:text-gray-500"
                />

                {/* Phone */}
                <Input
                  type="tel"
                  placeholder="Phone"
                  className="h-12 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 placeholder:text-gray-500"
                />

                {/* Password */}
                <Input
                  type="password"
                  placeholder="Password"
                  className="h-12 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 placeholder:text-gray-500"
                />

                {/* Repeat Password */}
                <Input
                  type="password"
                  placeholder="Repeat Password"
                  className="h-12 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 placeholder:text-gray-500"
                />

                {/* Create Account Button */}
                <Button
                  type="submit"
                  className="hover:bg-learning-blue/90 mt-6 h-12 w-full rounded-full bg-base font-medium text-white"
                >
                  Create Account
                </Button>
              </form>

              {/* Login link */}
              <p className="mt-4 text-start text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="cursor-pointer text-base underline"
                >
                  Login
                </Link>
              </p>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-50 px-2 text-gray-500">or</span>
                </div>
              </div>

              {/* Social buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="h-12 flex-1 border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-700"
                >
                  <FcGoogle />
                  <span className="hidden md:inline">Sign up with</span> Google
                </Button>

                <Link
                  href="/login"
                  className="group flex flex-1 grow items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-white px-2 text-gray-700 hover:bg-gray-50"
                >
                  <Button
                    variant="outline"
                    className="flex h-12 items-center justify-center gap-x-1 border-none text-sm group-hover:text-gray-700 hover:bg-transparent hover:text-gray-700"
                  >
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#1877F2"
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                    <span className="hidden md:inline">Sign up with</span>{" "}
                    Facebook
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// import FormCalender from "@/components/Join-teacher-form/formCalender";
import FormCalender from "@/components/join-teacher-form/FormCalender";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function Page() {
  return (
    <Card className="container-width mx-3 mt-10 bg-white shadow-sm md:mx-auto md:mt-[4.25rem]">
      <CardContent className="p-8">
        {/* Title */}
        <h1 className="mb-8 text-center text-2xl font-semibold text-gray-900">
          Join as a Teacher
        </h1>

        <form className="space-y-8">
          {/* Personal Information Section */}
          <div>
            <h2 className="mb-6 font-normal text-gray-500">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-sm font-normal text-gray-700"
                >
                  Full Name
                </Label>
                <Input id="fullName" className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="emailAddress"
                  className="text-sm font-normal text-gray-700"
                >
                  Email Address
                </Label>
                <Input
                  id="emailAddress"
                  type="email"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-sm font-normal text-gray-700"
                >
                  Phone Number
                </Label>
                <Input id="phoneNumber" className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="dateOfBirth"
                  className="text-sm font-normal text-gray-700"
                >
                  Date of Birth
                </Label>
                <FormCalender />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h2 className="mb-6 font-normal text-gray-500">Address</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="streetAddress"
                  className="text-sm font-normal text-gray-700"
                >
                  Street Address
                </Label>
                <Input id="streetAddress" className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-sm font-normal text-gray-700"
                >
                  City
                </Label>
                <Input id="city" className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="state"
                  className="text-sm font-normal text-gray-700"
                >
                  State
                </Label>
                <Input id="state" className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="postalCode"
                  className="text-sm font-normal text-gray-700"
                >
                  Postal/Zip Code
                </Label>
                <Input id="postalCode" className="border-gray-300" />
              </div>
            </div>
          </div>

          {/* Educational Qualifications Section */}
          <div>
            <h2 className="mb-6 font-normal text-gray-500">
              Educational Qualifications
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="highestQualification"
                  className="text-sm font-normal text-gray-700"
                >
                  Highest Qualification
                </Label>
                <Input id="highestQualification" className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="universityName"
                  className="text-sm font-normal text-gray-700"
                >
                  University/Institution Name
                </Label>
                <Input id="universityName" className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="yearOfGraduation"
                  className="text-sm font-normal text-gray-700"
                >
                  Year of Graduation
                </Label>
                <Input id="yearOfGraduation" className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="department"
                  className="text-sm font-normal text-gray-700"
                >
                  Department
                </Label>
                <Input id="department" className="border-gray-300" />
              </div>
            </div>
          </div>

          {/* Profile Photo & ID Proof Section */}
          <div>
            <h2 className="mb-6 font-normal text-gray-500">
              Profile Photo & ID Proof
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="profilePicture"
                  className="text-sm font-normal text-gray-700"
                >
                  Upload Profile Picture
                </Label>
                <div className="flex">
                  <Input className="px-3 file:me-3 file:border-0" type="file" />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="resume"
                  className="text-sm font-normal text-gray-700"
                >
                  Upload Resume
                </Label>
                <div className="flex">
                  <Input className="px-3 file:me-3 file:border-0" type="file" />
                </div>
              </div>
            </div>
          </div>

          {/* Other Details Section */}
          <div>
            <h2 className="mb-6 font-normal text-gray-500">Other Details</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="whyTeacher"
                  className="text-sm font-normal text-gray-700"
                >
                  Why do you want to join as a teacher?
                </Label>
                <Textarea
                  id="whyTeacher"
                  className="min-h-24 resize-none border-gray-300"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="hearAbout"
                  className="text-sm font-normal text-gray-700"
                >
                  How did you hear about us?
                </Label>
                <Textarea
                  id="hearAbout"
                  className="min-h-24 resize-none border-gray-300"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="space-y-6">
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-1" />
              <Label
                htmlFor="terms"
                className="line-clamp-2 text-sm leading-relaxed text-gray-700"
              >
                I agree to the{" "}
                <Link
                  href="/terms-and-conditions"
                  className="text-base underline"
                >
                  Terms Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-base underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-base px-8 text-white hover:bg-base/90"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

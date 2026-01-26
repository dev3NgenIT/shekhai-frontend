import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AlertCircle, Calendar, Clock, Video } from "lucide-react";
import { useState } from "react";

const RegistrationModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 sm:max-w-md">
        <DialogTitle className="sr-only">
          Math Workshop Registration
        </DialogTitle>
        <div className="space-y-4">
          <Badge className="w-fit bg-[#3B5998] px-3 py-1 text-white">
            For Learners
          </Badge>

          <div>
            <p className="mb-1 text-sm font-medium text-[#3B5998]">
              Register for a free session
            </p>
            <h2 className="text-2xl font-bold text-gray-800">Math Workshop</h2>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Aug 5, 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>11:00 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-500 p-1">
              <Video className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium">Zoom Meeting</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full"
            />

            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full"
            />

            <div className="flex items-center gap-2 rounded bg-orange-50 p-2 text-sm text-orange-600">
              <AlertCircle className="h-4 w-4" />
              <span>Use the same email you registered</span>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="bg-[#3B5998] px-6 text-white hover:bg-[#2d4373]"
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6"
              >
                Cancel
              </Button>
            </div>
          </form>

          <p className="text-sm text-gray-600">
            Not a member?{" "}
            <span className="cursor-pointer text-[#3B5998] hover:underline">
              Sign Up
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-8 text-center sm:max-w-md">
        <DialogTitle className="sr-only">Success Modal</DialogTitle>
        <div className="space-y-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
            <div className="relative h-8 w-12 rounded-t-lg bg-blue-500">
              <div className="absolute inset-x-2 top-2 space-y-1">
                <div className="h-1 rounded bg-gray-300"></div>
                <div className="h-1 rounded bg-gray-300"></div>
                <div className="h-1 rounded bg-gray-300"></div>
              </div>
              <div className="absolute -bottom-1 left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-4 border-r-4 border-l-4 border-transparent border-t-blue-500"></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Invitation Sent</h2>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              We've sent the Zoom meeting link and details to your registered
              email address{" "}
              <span className="font-medium text-[#3B5998]">
                anisurrahman@gmail.com
              </span>
              . Please check your inbox.
            </p>
            <p>
              Make sure to join a few minutes early to test your audio and video
              settings.
            </p>
          </div>

          <hr className="my-4" />

          <p className="text-sm text-gray-500">
            If you not got any mail{" "}
            <span className="cursor-pointer text-[#3B5998] hover:underline">
              Resend invitation mail
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;

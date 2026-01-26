import { Suspense } from "react";
import CheckOutForms from "@/components/CheckOut/CheckOutForms";

export default function Page() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckOutForms />
    </Suspense>
  );
}

function CheckoutLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto" />
        <p className="mt-4 text-gray-600">Loading checkout...</p>
      </div>
    </div>
  );
}

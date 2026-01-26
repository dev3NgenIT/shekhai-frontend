import { Suspense } from 'react';
import CheckOutForms from "@/components/CheckOut/CheckOutForms";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading checkout...</div>}>
        <CheckOutForms />
      </Suspense>
    </div>
  );
};

export default Page;
import CategoryTabs from "@/components/courses/CategoryTabs";
import Spinner from "@/components/shared/spinner/Spinner";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="page-body container-width">
      <Suspense fallback={<Spinner />}>
        <CategoryTabs />

        {/* <Tags /> */}

        {/* <Courses /> */}

        {/* <PaginationFooter /> */}
      </Suspense>
    </main>
  );
}

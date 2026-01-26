import { LoaderCircleIcon } from "lucide-react";

export default function Spinner() {
  return (
    <section className="page-body flex items-center justify-center">
      <LoaderCircleIcon
        className="-ms-1 animate-spin"
        size={20}
        aria-hidden="true"
      />
    </section>
  );
}

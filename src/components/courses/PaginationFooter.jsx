"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export default function PaginationFooter({ total = 10 }) {
  const path = usePathname();
  const searchParams = useSearchParams();

  const current = searchParams.get("page") || 1;

  const currentPage = parseInt(current);
  const totalPages = parseInt(total);

  // Function to create URL with preserved query params
  const createPageUrl = (pageNum) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNum);

    return `${path}?${params.toString()}`;
  };

  // Calculate page range to display (always show 5 pages if possible)
  const getPageRange = () => {
    const pagesToShow = 5;

    // If we have fewer pages than the number we want to show
    if (totalPages <= pagesToShow) {
      // Show all pages from 1 to totalPages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate the range to show based on current page
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    // Adjust if we're near the end
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const pageRange = getPageRange();

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {/* Previous Button */}
        {currentPage > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious href={createPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}

        {/* Page Numbers */}
        {pageRange.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={currentPage === pageNumber}
              href={createPageUrl(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        {currentPage < totalPages && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext href={createPageUrl(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

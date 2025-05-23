"use client";

import { useRouter } from "next/navigation";

const Pagination = ({ page, count, onPageChange }) => {
  const router = useRouter();

  const hasPrev = page > 1; // ✅ Fix prev logic
  const hasNext = page < count; // ✅ Fix next logic

  const changePage = (newPage) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
    onPageChange(newPage); // ✅ Ensure the parent component updates page
  };

  return (
    <div className='p-4 flex items-center justify-between text-gray-500'>
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => changePage(page - 1)}
      >
        Prev
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: count }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              className={`px-2 rounded-sm ${page === pageIndex ? "bg-sky" : ""}`}
              onClick={() => changePage(pageIndex)}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        disabled={!hasNext}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => changePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
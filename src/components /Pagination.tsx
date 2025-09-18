"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    page: number;
    totalPages: number;
}

const MAX_VISIBLE_PAGES = 5;

export default function Pagination({ page, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`/?${params.toString()}`);
    };

    const handlePrev = () => updatePage(Math.max(1, page - 1));
    const handleNext = () => updatePage(Math.min(totalPages, page + 1));

    const getPageNumbers = () => {
        let start = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
        const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);
        start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const pages = getPageNumbers();

    return (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-3 py-1 rounded-md border border-slate-700 bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
            >
                Prev
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => updatePage(p)}
                    className={`px-3 py-1 rounded-md border border-slate-700 ${
                        p === page
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-md border border-slate-700 bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}


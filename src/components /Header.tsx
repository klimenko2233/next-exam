"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IGenre } from "@/models/IGenre";

interface ISearchForm {
    query: string;
    genre: string;
}

export default function Header({ genres }: { genres: IGenre[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { register, watch } = useForm<ISearchForm>({
        defaultValues: {
            query: searchParams.get("query") || "",
            genre: searchParams.get("genre") || "",
        },
    });

    const watchedQuery = watch("query");
    const watchedGenre = watch("genre");

    useEffect(() => {
        const params = new URLSearchParams();

        if (watchedQuery) params.set("query", watchedQuery);
        if (watchedGenre) params.set("genre", watchedGenre);
        params.set("page", "1");

        router.push(`/?${params.toString()}`);
    }, [watchedQuery, watchedGenre,router]);

    return (
        <header className="flex flex-col md:flex-row justify-between items-center p-6 bg-slate-800 text-slate-100 sticky top-0 z-50 shadow-lg">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">The Movies App</h1>

            <form className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <input
                    {...register("query")}
                    placeholder="Search movies..."
                    className="
                    rounded-lg
                    border border-gray-500
                    bg-slate-700
                    placeholder-slate-300
                    px-4 py-3
                    text-slate-100
                    text-base
                    focus:outline-none
                    focus:ring-2 focus:ring-indigo-500
                    focus:border-indigo-500
                    w-full
                    sm:w-[400px]
                    transition
                    hover:border-indigo-400
                "
                />

                <select
                    {...register("genre")}
                    className="
                    rounded-lg
                    border border-gray-500
                    bg-slate-700
                    text-slate-100
                    px-4 py-3
                    text-base
                    focus:outline-none
                    focus:ring-2 focus:ring-indigo-500
                    focus:border-indigo-500
                    w-full
                    sm:w-48
                    transition
                    hover:border-indigo-400
                "
                >
                    <option value="">All genres</option>
                    {genres.map((g) => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>
            </form>
        </header>
    );


}


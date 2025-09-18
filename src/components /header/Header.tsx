'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IGenre } from "@/models/IGenre";
import {UserInfo} from "@/components /user-info/UserInfo";

interface ISearchForm {
    query: string;
    genre: string;
}

export default function Header({ genres }: { genres: IGenre[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { register, watch, reset } = useForm<ISearchForm>({
        defaultValues: {
            query: searchParams.get("query") || "",
            genre: searchParams.get("genre") || "",
        },
    });

    const watchedQuery = watch("query");
    const watchedGenre = watch("genre");

    useEffect(() => {

        const params = new URLSearchParams(searchParams.toString());

        if (watchedQuery) {
            params.set("query", watchedQuery);
        } else {
            params.delete("query");
        }

        if (watchedGenre) {
            params.set("genre", watchedGenre);
        } else {
            params.delete("genre");
        }

        params.set("page", "1");
        router.push(`/?${params.toString()}`);

    }, [watchedQuery, watchedGenre, router]);

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        reset({ query: "", genre: "" });
        router.push("/");
    };

    return (
        <header className="flex flex-col md:flex-row justify-between items-center p-6 bg-slate-800 text-slate-100 sticky top-0 z-50 shadow-lg gap-4">
            <Link
                href="/public"
                onClick={handleLogoClick}
                className="text-2xl font-bold text-indigo-400 hover:text-indigo-300"
            >
                🎬 The Movies App
            </Link>

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
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>
            </form>

            <UserInfo />
        </header>
    );
}





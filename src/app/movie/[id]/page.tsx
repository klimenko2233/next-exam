import { getGenres, getMovieDetails } from "@/lib/tmdb";
import Link from "next/link";
import MovieInfo from "@/components /MovieInfo";

interface MovieDetailsPageProps {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MovieDetailsPage({ params, searchParams }: MovieDetailsPageProps) {
    const awaitedParams = await params;
    const movieId = Number(awaitedParams.id);

    const sp = searchParams ? await searchParams : {};
    const backSearch = Object.keys(sp).length
        ? `?${new URLSearchParams(sp as Record<string, string>).toString()}`
        : "";
    const backHref = `/${backSearch}`;

    const [movie, genres] = await Promise.all([getMovieDetails(movieId), getGenres()]);

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/no-poster.png"
                    }
                    alt={movie.title}
                    className="rounded-xl shadow"
                />
                <Link href={backHref} className="inline-block mt-4 text-indigo-400 hover:underline">
                    ← Back to Movies
                </Link>
            </div>

            <div className="md:col-span-2">
                <MovieInfo movie={movie} genres={genres} />
            </div>
        </div>
    );
}



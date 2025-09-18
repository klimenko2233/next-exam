import { getMovies } from "@/lib/tmdb";
import { IMovie } from "@/models/IMovie";
import {MoviesList} from "@/components /MoviesList";
import Pagination from "@/components /Pagination";

interface PageProps {
    searchParams: Promise<Record<string, string | undefined>>;
}

export default async function MoviesPage({ searchParams }: PageProps) {
    const params = await searchParams;

    const page = parseInt(params.page || "1",10);
    const query = params.query || "";
    const genre = params.genre ? parseInt(params.genre,10) : undefined;

    const data = await getMovies(page, query, genre);
    const movies: IMovie[] = data.results ?? [];
    const totalPages: number = data.total_pages ?? 1;


    return (
        <div className="space-y-8">
            <MoviesList movies={movies} />

            {totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} />
            )}
        </div>
    );
}
























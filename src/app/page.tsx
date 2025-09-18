import { getMovies, getGenres } from "@/lib/tmdb";
import {MoviesList} from "@/components /MoviesList";
import Pagination from "@/components /Pagination";


interface PageProps {
    searchParams: Promise<Record<string, string | undefined>>;
}

export default async function MoviesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const page = Number(params.page ?? 1);
    const query = params.query ?? '';
    const genre = params.genre ? Number(params.genre) : undefined;

    const [data, genres] = await Promise.all([
        getMovies(page, query, genre),
        getGenres()
    ]);

    const movies = data.results ?? [];
    const totalPages = data.total_pages ?? 1;

    return (
        <div>
            <MoviesList movies={movies} genres={genres} />
            <Pagination page={page} totalPages={totalPages} />
        </div>
    );
}































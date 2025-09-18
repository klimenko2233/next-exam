import { IMovieResponse } from "@/models/IMovie";

const TMDB_TOKEN = process.env.TMDB_TOKEN;

if (!TMDB_TOKEN) throw new Error("TMDB_TOKEN is not defined in .env");

const headers = {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    "Content-Type": "application/json",
};

export async function getMovies(
    page: number = 1,
    query: string = "",
    genre?: number
): Promise<IMovieResponse> {
    let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`;

    if (query) url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}`;
    if (genre) url += `&with_genres=${genre}`;

    const res = await fetch(url, { headers });
    if (!res.ok) {
        const text = await res.text();
        console.error("TMDB fetch error:", text);
        throw new Error("Failed to fetch movies from TMDB");
    }

    return res.json();
}

export async function getGenres(): Promise<{ id: number; name: string }[]> {
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en-US", { headers });
    if (!res.ok) {
        const text = await res.text();
        console.error("TMDB fetch genres error:", text);
        throw new Error("Failed to fetch genres from TMDB");
    }
    const data = await res.json();
    return data.genres;
}



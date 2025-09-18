import { MovieCard } from "./movie-card/MovieCard";
import {IMovie} from "@/models/IMovie";
import {IGenre} from "@/models/IGenre";

interface MoviesListProps {
    movies: IMovie[];
    genres: IGenre[];
}

export const MoviesList = ({ movies, genres }: MoviesListProps) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {movies.map((m) => (
                <MovieCard key={m.id} movie={m} genres={genres} />
            ))}
        </div>
    );
};



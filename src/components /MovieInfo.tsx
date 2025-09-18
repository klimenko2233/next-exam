import { IGenre } from "@/models/IGenre";
import { IMovie } from "@/models/IMovie";
import {GenreBadge} from "@/components /GenreBadge";
import {StarsRating} from "@/components /StarsRating";

interface MovieInfoProps {
    movie: IMovie;
    genres: IGenre[];
}

export default function MovieInfo({ movie, genres }: MovieInfoProps) {
    const movieGenres =
        movie.genres?.length
            ? movie.genres
            : (movie.genre_ids || [])
                .map(id => genres.find(g => g.id === id))
                .filter(Boolean) as IGenre[];

    return (
        <div>
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            {movie.release_date && (
                <p className="text-sm text-gray-400 mt-1">
                    Release: {movie.release_date}
                </p>
            )}

            <StarsRating rating={movie.vote_average} />

            <div className="mt-4 flex flex-wrap gap-2">
                {movieGenres.map(g => (
                    <GenreBadge key={g.id} name={g.name} />
                ))}
            </div>

            {movie.overview && <p className="mt-6 leading-7">{movie.overview}</p>}
        </div>
    );
}


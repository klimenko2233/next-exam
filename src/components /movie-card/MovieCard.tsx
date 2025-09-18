"use client";

import { IMovie } from "@/models/IMovie";
import Link from "next/link";
import { IGenre } from "@/models/IGenre";
import { GenreBadge } from "@/components /GenreBadge";
import { StarsRating } from "@/components /StarsRating";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface MovieCardProps {
    movie: IMovie;
    genres: IGenre[];
}

export const MovieCard = ({ movie, genres }: MovieCardProps) => {
    const searchParams = useSearchParams();
    const movieGenres = (movie.genre_ids || [])
        .map(id => genres.find(g => g.id === id))
        .filter(Boolean) as IGenre[];

    return (
        <Link
            href={`/movie/${movie.id}?${searchParams.toString()}`}
            className="block bg-slate-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
            <div className="relative w-full h-80"> {/* контейнер для fill */}
                <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-100 truncate">
                    {movie.title}
                </h3>
                <div className="mt-2">
                    <StarsRating rating={movie.vote_average} />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {movieGenres.map((g) => (
                        <GenreBadge key={g.id} name={g.name} />
                    ))}
                </div>
            </div>
        </Link>
    );
};





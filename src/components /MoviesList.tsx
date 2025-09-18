import { IMovie } from "@/models/IMovie";

interface MoviesListProps {
    movies: IMovie[];
}

export const MoviesList = ({ movies }: MoviesListProps) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {movies.map((m) => (
                <div
                    key={m.id}
                    className="bg-slate-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                        alt={m.title}
                        className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-slate-100 truncate">{m.title}</h3>
                        <p className="text-sm text-slate-400">{m.release_date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

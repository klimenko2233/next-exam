"use client";

import { Star } from "lucide-react";

interface StarsRatingProps {
    rating: number;
}

export const StarsRating = ({ rating }: StarsRatingProps) => {
    const stars = Math.round(rating / 2);

    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}
                />
            ))}
            <span className="ml-1 text-sm text-gray-400">{rating.toFixed(1)}</span>
        </div>
    );
};

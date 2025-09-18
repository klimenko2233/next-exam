"use client";

interface GenreBadgeProps {
    name: string;
}

export const GenreBadge = ({ name }: GenreBadgeProps) => {
    return (
        <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded-lg shadow">
            {name}
        </span>
    );
};


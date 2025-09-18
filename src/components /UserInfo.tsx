"use client";

export const UserInfo = () => {
    return (
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <span className="text-sm text-gray-200">UserName</span>
        </div>
    );
};

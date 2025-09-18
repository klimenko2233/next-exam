'use client';


import Header from "@/components /header/Header";

export default function NotFoundClient() {
    return (
        <div>
            <Header genres={[]} />
            <h1 className="text-2xl text-white">Page not found</h1>
        </div>
    );
}

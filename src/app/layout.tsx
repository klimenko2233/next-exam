import "./globals.css";
import type { ReactNode } from "react";
import { getGenres } from "@/lib/tmdb";
import Header from "@/components /Header";
import {IGenre} from "@/models/IGenre";
import {Metadata} from "next";

export const metadata:Metadata = {
    title: "The Movies App",
    description: "Browse popular movie — Next + TMDB",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
    let genres:IGenre[] = [];
    try {
        genres = await getGenres();
    } catch (err) {
        console.error("Failed to load genres in layout:", err);
        genres = [];
    }

    return (
        <html lang="en">
        <body className="min-h-screen bg-slate-900 text-slate-100">
        <Header genres={genres} />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
        </main>

        <footer className="w-full border-t border-slate-800 bg-slate-900 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-400">
                © The Movies App
            </div>
        </footer>
        </body>
        </html>
    );
}












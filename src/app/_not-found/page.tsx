import NotFoundClient from './NotFoundClient';
import { Suspense } from 'react';

export default function NotFoundPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NotFoundClient />
        </Suspense>
    );
}





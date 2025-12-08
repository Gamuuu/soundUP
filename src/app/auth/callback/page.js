'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseAuth } from '../../../lib/supabaseAuth';

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        // The Supabase client is configured to handle the session exchange automatically
        // via detectSessionInUrl: true.
        // We just need to wait for the session state to update.

        const { data: { subscription } } = supabaseAuth.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                router.push('/');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="animate-pulse">Completing login...</div>
        </div>
    );
}

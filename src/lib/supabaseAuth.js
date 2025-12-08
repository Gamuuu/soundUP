'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a Supabase client for auth (client-side)
export const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        flowType: 'pkce',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
});

export const signInWithGoogle = async () => {
    const { data, error } = await supabaseAuth.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
        },
    });

    if (error) {
        console.error('Google Sign In Error:', error);
        throw error;
    }

    return data;
};

export const signOut = async () => {
    const { error } = await supabaseAuth.auth.signOut();
    if (error) {
        console.error('Sign Out Error:', error);
        throw error;
    }
};

export const getSession = async () => {
    const { data: { session }, error } = await supabaseAuth.auth.getSession();
    if (error) {
        console.error('Get Session Error:', error);
        return null;
    }
    return session;
};

export const getUser = async () => {
    const { data: { user }, error } = await supabaseAuth.auth.getUser();
    if (error) {
        console.error('Get User Error:', error);
        return null;
    }
    return user;
};

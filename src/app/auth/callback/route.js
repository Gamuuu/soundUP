import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET(request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    if (code) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && data.session) {
            // Store user info in response cookie or handle as needed
            const response = NextResponse.redirect(`${origin}${next}`);
            return response;
        }
    }

    // Return to login on error
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}

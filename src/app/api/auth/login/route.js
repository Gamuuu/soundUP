import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const { data: user, error } = await supabase
      .from('User')
      .select('id, email, name, password, role')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // In a real production app, verify password hash here (e.g. bcrypt.compare)
    // For this project, we compare directly
    if (user.password !== password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Login Success
    return NextResponse.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
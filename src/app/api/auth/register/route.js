import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: findError } = await supabase
      .from('User')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    // Create new user
    // NOTE: Password should be hashed in production using bcrypt!
    const userId = crypto.randomUUID();
    const now = new Date().toISOString();

    const { data: newUser, error: insertError } = await supabase
      .from('User')
      .insert({
        id: userId,
        name,
        email,
        password, // Plain text password
        role: 'USER',
        createdAt: now,
        updatedAt: now,
      })
      .select('id, name, email')
      .single();

    if (insertError) {
      console.error('Insert Error:', insertError);
      return NextResponse.json(
        { message: 'Failed to create user', error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}

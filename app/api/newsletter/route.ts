import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email registered in the CHARAN Horological Registry.',
      email,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to register subscriber.' },
      { status: 500 }
    );
  }
}

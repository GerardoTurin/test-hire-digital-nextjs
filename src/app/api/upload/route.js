import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';





export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || 'file';

  if (!filename) return NextResponse.error(new Error('No filename provided'), { status: 400 });

  // ⚠️ The below code is for App Router Route Handlers only
  const blob = await put(filename, request.body, {
    access: 'public',
  });


  return NextResponse.json(blob);
}



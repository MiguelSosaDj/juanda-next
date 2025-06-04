import { db } from '@/lib/db';
import { usuario } from '@/drizzle/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  const usuarios = await db.select().from(usuario);
  return NextResponse.json(usuarios);
}

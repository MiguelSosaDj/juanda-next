import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/drizzle/db';
import { gemelar } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const db = await connectToDatabase();
    
    const { id, ...updateData } = data;
    
    await db.update(gemelar)
      .set(updateData)
      .where(eq(gemelar.id, id));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating gemelar:', error);
    return NextResponse.json(
      { error: 'Error updating gemelar' },
      { status: 500 }
    );
  }
}
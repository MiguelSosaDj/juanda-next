import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

export const getRecordById = cache(async <T extends { id: string }>(
  table: any,
  id: string
): Promise<T | null> => {
  try {
    const record = await db.select().from(table).where(eq(table.id, id));
    return record[0] || null;
  } catch (error) {
    console.error('Error fetching record:', error);
    return null;
  }
});

export const getAllRecords = cache(async <T>(
  table: any,
  limit: number = 100,
  offset: number = 0
): Promise<T[]> => {
  try {
    const records = await db
      .select()
      .from(table)
      .limit(limit)
      .offset(offset);
    return records;
  } catch (error) {
    console.error('Error fetching records:', error);
    return [];
  }
});

export const getRecordCount = cache(async (
  table: any
): Promise<number> => {
  try {
    const result = await db
      .select({ count: sql`count(*)` })
      .from(table);
    return Number(result[0].count) || 0;
  } catch (error) {
    console.error('Error counting records:', error);
    return 0;
  }
});
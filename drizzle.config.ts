import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/drizzle/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: true,
  },
  strict: true,
  verbose: true,
} satisfies Config;

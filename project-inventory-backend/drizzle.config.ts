import { configDotenv } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

configDotenv()

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://postgres:0000@db:5432/project-inventory",
  },
});
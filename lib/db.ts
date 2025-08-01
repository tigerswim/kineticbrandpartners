import { neon } from '@neondatabase/serverless';

// Use the NETLIFY_DATABASE_URL that Netlify automatically created from Neon integration
const databaseUrl = process.env.NETLIFY_DATABASE_URL;

if (!databaseUrl) {
  console.error('NETLIFY_DATABASE_URL environment variable is not set');
}

const sql = databaseUrl ? neon(databaseUrl) : null;

export default sql; 
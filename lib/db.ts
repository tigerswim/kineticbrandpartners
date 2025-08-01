import { neon } from '@neondatabase/serverless';

// Use the NETLIFY_DATABASE_URL that Netlify automatically created from Neon integration
const sql = process.env.NETLIFY_DATABASE_URL ? neon(process.env.NETLIFY_DATABASE_URL) : null;

export default sql; 
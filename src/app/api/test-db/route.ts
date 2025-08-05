import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    if (!sql) {
      return NextResponse.json({ 
        error: 'Database not configured',
        envVars: {
          NETLIFY_DATABASE_URL: !!process.env.NETLIFY_DATABASE_URL,
          DATABASE_URL: !!process.env.DATABASE_URL,
          NEON_DATABASE_URL: !!process.env.NEON_DATABASE_URL
        }
      }, { status: 503 });
    }
    
    // Test the connection with a simple query
    const result = await sql`SELECT 1 as test`;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection working',
      test: result[0]
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 
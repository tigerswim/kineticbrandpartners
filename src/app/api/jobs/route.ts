import { NextRequest, NextResponse } from 'next/server';
import sql from '../../../../lib/db';

// GET all jobs
export async function GET() {
  try {
    if (!sql) {
      console.error('Database connection not available - NETLIFY_DATABASE_URL may not be set');
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    
    const jobs = await sql`
      SELECT * FROM jobs 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

// POST new job
export async function POST(request: NextRequest) {
  try {
    if (!sql) {
      console.error('Database connection not available - NETLIFY_DATABASE_URL may not be set');
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    
    const body = await request.json();
    const { company, position, status, salary, location, jobUrl, notes, dateAdded } = body;

    const result = await sql`
      INSERT INTO jobs (company, position, status, salary, location, job_url, notes, date_added)
      VALUES (${company}, ${position}, ${status}, ${salary}, ${location}, ${jobUrl}, ${notes}, ${dateAdded})
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}

// PUT update job
export async function PUT(request: NextRequest) {
  try {
    if (!sql) {
      console.error('Database connection not available - NETLIFY_DATABASE_URL may not be set');
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    
    const body = await request.json();
    const { id, company, position, status, salary, location, jobUrl, notes, dateAdded } = body;

    const result = await sql`
      UPDATE jobs 
      SET company = ${company}, 
          position = ${position}, 
          status = ${status}, 
          salary = ${salary}, 
          location = ${location}, 
          job_url = ${jobUrl}, 
          notes = ${notes}, 
          date_added = ${dateAdded},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

// DELETE job
export async function DELETE(request: NextRequest) {
  try {
    if (!sql) {
      console.error('Database connection not available - NETLIFY_DATABASE_URL may not be set');
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    await sql`DELETE FROM jobs WHERE id = ${id}`;
    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
} 
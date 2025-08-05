import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

// GET all contacts with their interactions
export async function GET() {
  try {
    if (!sql) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    
    const contacts = await sql`
      SELECT 
        c.*,
        json_agg(
          json_build_object(
            'id', i.id,
            'date', i.date,
            'type', i.type,
            'summary', i.summary,
            'notes', i.notes
          ) ORDER BY i.date DESC
        ) FILTER (WHERE i.id IS NOT NULL) as interactions
      FROM contacts c
      LEFT JOIN interactions i ON c.id = i.contact_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `;

    // Clean up the interactions array (remove null entries)
    const cleanedContacts = contacts.map(contact => ({
      ...contact,
      interactions: contact.interactions || []
    }));

    return NextResponse.json(cleanedContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

// POST new contact
export async function POST(request: NextRequest) {
  try {
    if (!sql) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    
    const body = await request.json();
    const { name, company, position, email, phone, linkedin, associatedJob, notes } = body;

    const result = await sql`
      INSERT INTO contacts (name, company, position, email, phone, linkedin, associated_job, notes)
      VALUES (${name}, ${company}, ${position}, ${email}, ${phone}, ${linkedin}, ${associatedJob}, ${notes})
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}

// PUT update contact
export async function PUT(request: NextRequest) {
  try {
    if (!sql) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    
    const body = await request.json();
    const { id, name, company, position, email, phone, linkedin, associatedJob, notes } = body;

    const result = await sql`
      UPDATE contacts 
      SET name = ${name}, 
          company = ${company}, 
          position = ${position}, 
          email = ${email}, 
          phone = ${phone}, 
          linkedin = ${linkedin}, 
          associated_job = ${associatedJob}, 
          notes = ${notes},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

// DELETE contact
export async function DELETE(request: NextRequest) {
  try {
    if (!sql) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    await sql`DELETE FROM contacts WHERE id = ${id}`;
    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
} 
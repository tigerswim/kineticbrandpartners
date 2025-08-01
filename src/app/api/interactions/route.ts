import { NextRequest, NextResponse } from 'next/server';
import sql from '../../../../lib/db';

// POST new interaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactId, date, type, summary, notes } = body;

    const result = await sql`
      INSERT INTO interactions (contact_id, date, type, summary, notes)
      VALUES (${contactId}, ${date}, ${type}, ${summary}, ${notes})
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating interaction:', error);
    return NextResponse.json({ error: 'Failed to create interaction' }, { status: 500 });
  }
}

// PUT update interaction
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, date, type, summary, notes } = body;

    const result = await sql`
      UPDATE interactions 
      SET date = ${date}, 
          type = ${type}, 
          summary = ${summary}, 
          notes = ${notes}
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating interaction:', error);
    return NextResponse.json({ error: 'Failed to update interaction' }, { status: 500 });
  }
}

// DELETE interaction
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Interaction ID is required' }, { status: 400 });
    }

    await sql`DELETE FROM interactions WHERE id = ${id}`;
    return NextResponse.json({ message: 'Interaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting interaction:', error);
    return NextResponse.json({ error: 'Failed to delete interaction' }, { status: 500 });
  }
} 
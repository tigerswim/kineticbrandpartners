import sql from './db';
import fs from 'fs';
import path from 'path';

export async function initializeDatabase() {
  try {
    if (!sql) {
      throw new Error('Database connection not available');
    }
    
    // Read the schema file
    const schemaPath = path.join(process.cwd(), 'lib', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema
    await sql.unsafe(schema);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
} 
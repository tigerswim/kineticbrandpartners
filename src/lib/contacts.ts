// src/lib/contacts.ts
import { supabase, Contact } from './supabase'

export async function getContacts(): Promise<Contact[]> {
  try {
    // Get current user first
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return []
    }

    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', user.id)  // Filter by user_id
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contacts:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Exception in getContacts:', error)
    return []
  }
}

export async function createContact(contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<Contact | null> {
  console.log('=== ENHANCED DEBUG: createContact started ===')
  
  try {
    // 1. Check user authentication
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('❌ User authentication error:', userError)
      return null
    }

    if (!user) {
      console.error('❌ No authenticated user')
      return null
    }

    console.log('✅ User authenticated:', user.email)

    // 2. Test basic table access
    console.log('🔍 Testing table access...')
    const { data: testData, error: testError } = await supabase
      .from('contacts')
      .select('id')
      .limit(1)

    if (testError) {
      console.error('❌ Table access error:', testError.message)
      console.error('Code:', testError.code)
      console.error('Details:', testError.details)
      return null
    }

    console.log('✅ Table access successful')

    // 3. Prepare insert data with new fields
    const insertData = {
      name: contact.name,
      email: contact.email || null,
      phone: contact.phone || null,
      company: contact.company || null,
      job_title: contact.job_title || null,
      linkedin_url: contact.linkedin_url || null,
      notes: contact.notes || null,
      experience: contact.experience || null,
      education: contact.education || null,
      mutual_connections: contact.mutual_connections || null,
      user_id: user.id
    }

    console.log('🔧 Prepared insert data:', insertData)

    // 4. Attempt the insert
    console.log('💾 Attempting insert...')
    const { data, error } = await supabase
      .from('contacts')
      .insert([insertData])
      .select()
      .single()

    if (error) {
      console.error('❌ Insert failed:', error.message)
      console.error('Code:', error.code)
      console.error('Details:', error.details)
      console.error('Hint:', error.hint)
      return null
    }

    console.log('✅ Contact created successfully:', data)
    return data

  } catch (exception) {
    console.error('❌ Exception in createContact:', exception)
    return null
  }
}

export async function updateContact(id: string, contactData: Partial<Omit<Contact, 'id' | 'created_at' | 'updated_at' | 'user_id'>>): Promise<Contact | null> {
  try {
    console.log('Updating contact with data:', contactData)

    const { data, error } = await supabase
      .from('contacts')
      .update({ 
        ...contactData, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating contact:', error)
      return null
    }

    console.log('Contact updated successfully:', data)
    return data
  } catch (error) {
    console.error('Exception in updateContact:', error)
    return null
  }
}

export async function deleteContact(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting contact:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Exception in deleteContact:', error)
    return false
  }
}
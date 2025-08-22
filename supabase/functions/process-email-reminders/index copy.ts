// supabase/functions/process-email-reminders/index.ts
// This function processes pending email reminders and sends them via Gmail API

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface EmailReminder {
  id: string
  user_id: string
  contact_id?: string
  job_id?: string
  scheduled_time: string
  user_timezone: string
  email_subject: string
  email_body: string
  user_message: string
  status: string
  contact_name?: string
  contact_email?: string
  contact_company?: string
  job_title?: string
  job_company?: string
  job_location?: string
}

interface GmailCredentials {
  client_email: string
  private_key: string
  project_id: string
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Gmail API configuration
const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send']
const GMAIL_FROM_EMAIL = 'jobtracker@kineticbrandpartners.com'

serve(async (req) => {
  try {
    console.log('Processing email reminders...')

    // Get Gmail credentials from Supabase secrets
    const gmailCredentials = await getGmailCredentials()
    if (!gmailCredentials) {
      throw new Error('Gmail credentials not configured')
    }

    // Get access token for Gmail API
    const accessToken = await getGmailAccessToken(gmailCredentials)

    // Get pending reminders that are due (within next 5 minutes)
    const now = new Date()
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000)

    const { data: pendingReminders, error: fetchError } = await supabase
      .from('reminder_details')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_time', fiveMinutesFromNow.toISOString())
      .order('scheduled_time', { ascending: true })
      .limit(50) // Process up to 50 reminders per run

    if (fetchError) {
      throw new Error(`Failed to fetch reminders: ${fetchError.message}`)
    }

    const reminders = (pendingReminders || []) as EmailReminder[]
    console.log(`Found ${reminders.length} reminders to process`)

    let processedCount = 0
    let errorCount = 0

    // Process each reminder
    for (const reminder of reminders) {
      try {
        // Get user's email address
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(reminder.user_id)
        
        if (userError || !userData?.user?.email) {
          throw new Error(`Unable to get user email for reminder ${reminder.id}`)
        }

        const userEmail = userData.user.email

        // Generate email content
        const emailContent = generateEmailContent(reminder, userEmail)

        // Send email via Gmail API
        await sendGmailMessage(accessToken, userEmail, emailContent)

        // Mark reminder as sent
        await supabase
          .from('email_reminders')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString()
          })
          .eq('id', reminder.id)

        processedCount++
        console.log(`Successfully sent reminder ${reminder.id}`)

      } catch (error) {
        console.error(`Error processing reminder ${reminder.id}:`, error)
        
        // Mark reminder as failed
        await supabase
          .from('email_reminders')
          .update({
            status: 'failed',
            error_message: error.message
          })
          .eq('id', reminder.id)

        errorCount++
      }
    }

    console.log(`Processing complete: ${processedCount} sent, ${errorCount} failed`)

    return new Response(
      JSON.stringify({
        success: true,
        processed: processedCount,
        errors: errorCount,
        total: reminders.length
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in email processor:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

async function getGmailCredentials(): Promise<GmailCredentials | null> {
  try {
    // Get credentials from Supabase secrets/environment variables
    const clientEmail = Deno.env.get('GMAIL_CLIENT_EMAIL')
    const privateKey = Deno.env.get('GMAIL_PRIVATE_KEY')
    const projectId = Deno.env.get('GMAIL_PROJECT_ID')

    if (!clientEmail || !privateKey || !projectId) {
      console.error('Gmail credentials not found in environment variables')
      return null
    }

    return {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, '\n'), // Handle newlines in private key
      project_id: projectId
    }
  } catch (error) {
    console.error('Error getting Gmail credentials:', error)
    return null
  }
}

async function getGmailAccessToken(credentials: GmailCredentials): Promise<string> {
  // Create JWT for Google Service Account authentication
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  }

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: credentials.client_email,
    scope: GMAIL_SCOPES.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }

  // Sign JWT (this is a simplified version - in production you'd use a proper JWT library)
  const jwt = await createJWT(header, payload, credentials.private_key)

  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  })

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text()
    throw new Error(`Failed to get access token: ${errorText}`)
  }

  const tokenData = await tokenResponse.json()
  return tokenData.access_token
}

async function createJWT(header: any, payload: any, privateKey: string): Promise<string> {
  // This is a simplified JWT implementation for demo purposes
  // In production, use a proper JWT library
  
  const encoder = new TextEncoder()
  
  // Base64url encode header and payload
  const encodedHeader = btoa(JSON.stringify(header))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    
  const encodedPayload = btoa(JSON.stringify(payload))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')

  const signingInput = `${encodedHeader}.${encodedPayload}`

  // Import private key for signing
  const keyData = privateKey
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '')

  const binaryKey = Uint8Array.from(atob(keyData), c => c.charCodeAt(0))

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256'
    },
    false,
    ['sign']
  )

  // Sign the JWT
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(signingInput)
  )

  // Base64url encode signature
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')

  return `${signingInput}.${encodedSignature}`
}

async function sendGmailMessage(accessToken: string, toEmail: string, emailContent: any) {
  // Create Gmail message in RFC 2822 format
  const message = [
    `To: ${toEmail}`,
    `From: Job Tracker <${GMAIL_FROM_EMAIL}>`,
    `Subject: ${emailContent.subject}`,
    `Content-Type: text/html; charset=UTF-8`,
    '',
    emailContent.body
  ].join('\r\n')

  // Base64 encode the message
  const encodedMessage = btoa(message)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')

  // Send via Gmail API
  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: encodedMessage
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gmail API error: ${response.status} - ${errorText}`)
  }

  return await response.json()
}

function generateEmailContent(reminder: EmailReminder, userEmail: string) {
  const appUrl = 'https://your-app-domain.com' // Replace with your actual domain
  
  let subject = reminder.email_subject
  
  let body = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
    .content { padding: 32px 24px; }
    .reminder-info { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #2563eb; }
    .contact-info { background: #ecfdf5; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .message-box { background: #fffbeb; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #fbbf24; }
    .message-box h3 { color: #92400e; margin: 0 0 12px 0; }
    .links { background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .btn { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 8px 8px 8px 0; }
    .footer { background: #f8fafc; padding: 20px 24px; text-align: center; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 Job Tracker Reminder</h1>
      <p>Time to follow up!</p>
    </div>
    
    <div class="content">
      <p>Hi there! 👋</p>
      
      <p>This is your scheduled reminder from Job Tracker.</p>
      
      <div class="reminder-info">
        <h3>📅 Reminder Details</h3>
        <p><strong>Scheduled for:</strong> ${new Date(reminder.scheduled_time).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          timeZoneName: 'short',
          timeZone: reminder.user_timezone
        })}</p>
  `

  // Add contact information if available
  if (reminder.contact_name) {
    body += `
        <div class="contact-info">
          <h4>👤 Contact Information</h4>
          <p><strong>Name:</strong> ${reminder.contact_name}</p>`
    
    if (reminder.contact_email) {
      body += `<p><strong>Email:</strong> <a href="mailto:${reminder.contact_email}">${reminder.contact_email}</a></p>`
    }
    
    if (reminder.contact_company) {
      body += `<p><strong>Company:</strong> ${reminder.contact_company}</p>`
    }
    
    body += `</div>`
  }

  // Add job information if available
  if (reminder.job_title) {
    body += `
        <div class="contact-info">
          <h4>💼 Job Information</h4>
          <p><strong>Position:</strong> ${reminder.job_title}</p>`
    
    if (reminder.job_company) {
      body += `<p><strong>Company:</strong> ${reminder.job_company}</p>`
    }
    
    if (reminder.job_location) {
      body += `<p><strong>Location:</strong> ${reminder.job_location}</p>`
    }
    
    body += `</div>`
  }

  // Add user's message
  body += `
      </div>
      
      <div class="message-box">
        <h3>💬 Your Message (Ready to Copy)</h3>
        <p style="white-space: pre-wrap; font-family: monospace; background: white; padding: 16px; border-radius: 4px; border: 1px solid #d1d5db;">${reminder.user_message}</p>
      </div>
      
      <div class="links">
        <h3>🚀 Quick Actions</h3>
        <a href="${appUrl}" class="btn">Open Job Tracker</a>`

  if (reminder.contact_id) {
    body += `<a href="${appUrl}?contact=${reminder.contact_id}" class="btn">View Contact</a>`
  }

  if (reminder.job_id) {
    body += `<a href="${appUrl}?job=${reminder.job_id}" class="btn">View Job</a>`
  }

  body += `
      </div>
      
      <p>Good luck with your follow-up! 🍀</p>
    </div>
    
    <div class="footer">
      <p>This reminder was sent by Job Tracker to <strong>${userEmail}</strong></p>
      <p>You can manage your reminders in the <a href="${appUrl}">Job Tracker app</a></p>
      <p><em>Launch Into a New Role! 🚀</em></p>
    </div>
  </div>
</body>
</html>`

  return { subject, body }
}
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ctubanaaurkmbwdhsxyp.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dWJhbmFhdXJrbWJ3ZGhzeHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NTA5MzEsImV4cCI6MjA2NzIyNjkzMX0.wl3663mKqHQOuDeLEpN0hC9Py7yaIG3j9dcXF1mep8U'

if (SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

export default supabase
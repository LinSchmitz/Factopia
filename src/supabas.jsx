import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hamcgcpwtbzfjrzqqsie.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhbWNnY3B3dGJ6ZmpyenFxc2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNzE3NzEsImV4cCI6MjA2Njg0Nzc3MX0.Gb4r9HExetrC3uXNkuMacCKr7GNwU14P8Vwf4OjWCEQ';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

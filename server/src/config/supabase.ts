import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase desde variables de entorno de Azure
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

// Cliente de Supabase para consultas directas
export const supabase = createClient(supabaseUrl, supabaseKey);

// Verificar configuración
export function checkSupabaseConfig(): void {
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase configuration missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY');
    process.exit(1);
  }
  console.log('✅ Supabase connected:', supabaseUrl);
}


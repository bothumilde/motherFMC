"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
exports.checkSupabaseConfig = checkSupabaseConfig;
const supabase_js_1 = require("@supabase/supabase-js");
// Configuración de Supabase desde variables de entorno de Azure
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
// Cliente de Supabase para consultas directas
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// Verificar configuración
function checkSupabaseConfig() {
    if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Supabase configuration missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY');
        process.exit(1);
    }
    console.log('✅ Supabase connected:', supabaseUrl);
}

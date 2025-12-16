import { createClient } from "@supabase/supabase-js";

// Supabase 프로젝트 설정
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

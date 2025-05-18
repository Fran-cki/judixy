import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
    "https://fyjalztzzqstobkipbeo.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5amFsenR6enFzdG9ia2lwYmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzQxODAsImV4cCI6MjA2MjgxMDE4MH0.CBoLXKpR5TzUWCn4C98G2Sxls6jHUkIMuSncnbVVx3k"
)
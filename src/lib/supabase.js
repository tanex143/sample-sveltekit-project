import { createClient } from "@supabase/supabase-js";

// import {
//     PUBLIC_SUPABASE_URL,
//     PUBLIC_SUPABASE_ANON_KEY,
//     // @ts-ignore
// } from "$env/static/public";

const supabase = createClient(
    "https://jsqkbdocyuiytdxgbexm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzcWtiZG9jeXVpeXRkeGdiZXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIxMzQ4NzgsImV4cCI6MTk4NzcxMDg3OH0.pvpp8OvRPAworikMy3HZne5J5DLavV5VGqMGJHbMRKM"
);

export default supabase;

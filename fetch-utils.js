const SUPABASE_URL = 'https://tapgnjxuglosydcymoii.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhcGduanh1Z2xvc3lkY3ltb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ0MDk3NzcsImV4cCI6MTk3OTk4NTc3N30.lVHyyl6SqferEcRGs-CnTZUTrouMFh09PxFZr4gorWA';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createItem(newItem) {
    return client.from('lists').insert(newItem).single();
}

export async function getItems() {
    const items = client.from('lists').select('*').order('created_at', { ascending: false });
    return items;
}

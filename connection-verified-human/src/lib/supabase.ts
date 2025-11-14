import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://gbbhrimupsgryuxpsktx.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjczZjAxZDVjLTBkN2ItNDBmYi04MzdiLTExMmM4OTRmYmJmMiJ9.eyJwcm9qZWN0SWQiOiJnYmJocmltdXBzZ3J5dXhwc2t0eCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzYyNzIyODQ0LCJleHAiOjIwNzgwODI4NDQsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.SLHQAJqcTAl0lJwsSj_RgGLB9N3r9X6ms3d0ajiGJyw';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };
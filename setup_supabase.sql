-- Run this in the Supabase SQL Editor to create the leads table
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  project_type text,
  description text
);

-- Recommended: Turn on Row Level Security and configure basic policies
alter table public.leads enable row level security;

-- Example: Allow anyone (anon) to insert leads into the table
create policy "Allow anonymous inserts" on public.leads
  for insert
  to anon
  with check (true);

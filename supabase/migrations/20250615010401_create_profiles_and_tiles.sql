-- Migration to create profiles and tiles tables
-- Enables pgcrypto for gen_random_uuid
create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) unique not null,
  display_name text,
  bio text,
  created_at timestamptz default now()
);

create table if not exists tiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  title text not null,
  url text,
  position integer default 0,
  created_at timestamptz default now()
);

create index if not exists tiles_profile_id_position_idx
  on tiles (profile_id, position);

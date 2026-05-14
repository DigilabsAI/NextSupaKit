create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  fullname text unique,
  gender text,
  mobile_number text,
  avatar_url text,
  role text not null default 'user',
  email text unique not null,
  hashed_password text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  owner uuid not null references public.profiles(id) on delete cascade,
  category text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


create table if not exists public.audit_trail (
  id uuid primary key default gen_random_uuid(),

  table_name text not null,
  record_id uuid not null,

  action text not null, -- INSERT | UPDATE | DELETE

  old_data jsonb,
  new_data jsonb,

  changed_by uuid, -- user (auth.uid())

  changed_at timestamptz not null default now()
);

--for buckets read the docs
--bucket created was profile for user avatars

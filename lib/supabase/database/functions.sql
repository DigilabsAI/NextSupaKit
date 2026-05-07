
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;
-- Partner Trigger to handle new user creation and insert into profiles table
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();


-- after running this function, make sure to turn on auth hooks in the auth page of your supabase project and 
--  add new hook (Customize Access Token (JWT) Claims hook) then select the function "public.jwt" from the dropdown and save it.

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
  claims jsonb;
  u_role text;
  u_fullname text;
  u_avatar_url text;
begin
  -- get profile data
  select
    role,
    fullname,
    avatar_url
  into
    U_role,
    u_fullname,
    u_avatar_url
  from public.profiles
  where id = (event->>'user_id')::uuid;

  claims := event->'claims';

  -- ensure user_metadata exists
  if jsonb_typeof(claims->'user_metadata') is null then
    claims := jsonb_set(claims, '{user_metadata}', '{}');
  end if;
  -- set app role
  claims := jsonb_set(
    claims,
    '{user_metadata,role}',
    to_jsonb(coalesce(u_role, 'user'))
  );
  -- set public user metadata
  claims := jsonb_set(
    claims,
    '{user_metadata,fullname}',
    to_jsonb(coalesce(u_fullname, ''))
  );
  claims := jsonb_set(
    claims,
    '{user_metadata,avatar_url}',
    to_jsonb(coalesce(u_avatar_url, ''))
  );
  -- save claims back
  event := jsonb_set(event, '{claims}', claims);

  return event;
end;
$$;
grant all on public.profiles to supabase_auth_admin;
grant select, insert, update on public.profiles to authenticated;
grant select on public.profiles to anon;

--sample usage is in supabase/proxy.ts file where we are fetching the role, fullname and avatar_url from the access token claims and using it in our app.
--Row Level Security


alter table public.items enable row level security;

create policy "Insert own items"
on public.items
for insert
with check (owner = auth.uid());

create policy "Update own items"
on public.items
for update
using (owner = auth.uid())
with check (owner = auth.uid());

create policy "Delete own items"
on public.items
for delete
using (owner = auth.uid());

create policy "Enable read access for all users"
on "public"."items"
as PERMISSIVE
for SELECT
to public
using (true);


--for ⨯ Error: permission denied for schema public
grant usage on schema public to anon, authenticated;

grant select, insert, update, delete
on all tables in schema public
to anon, authenticated;
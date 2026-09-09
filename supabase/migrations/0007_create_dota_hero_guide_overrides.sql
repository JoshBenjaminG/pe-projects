create table if not exists public.dota_hero_guide_overrides (
  hero_slug text primary key check (hero_slug ~ '^[a-z0-9_]+$'),
  roles text[] not null default '{}',
  crop_x numeric(5,2) not null default 50 check (crop_x between 0 and 100),
  crop_y numeric(5,2) not null default 50 check (crop_y between 0 and 100),
  updated_by uuid not null default auth.uid() references auth.users(id),
  updated_at timestamptz not null default now()
);

drop trigger if exists dota_hero_guide_overrides_set_updated_at
  on public.dota_hero_guide_overrides;
create trigger dota_hero_guide_overrides_set_updated_at
before update on public.dota_hero_guide_overrides
for each row execute function public.set_updated_at();

alter table public.dota_hero_guide_overrides enable row level security;

grant select on public.dota_hero_guide_overrides to anon, authenticated;
grant insert, update, delete on public.dota_hero_guide_overrides to authenticated;

drop policy if exists "anyone reads dota hero guide overrides"
  on public.dota_hero_guide_overrides;
create policy "anyone reads dota hero guide overrides"
on public.dota_hero_guide_overrides
for select
to anon, authenticated
using (true);

drop policy if exists "guide owner inserts dota hero guide overrides"
  on public.dota_hero_guide_overrides;
create policy "guide owner inserts dota hero guide overrides"
on public.dota_hero_guide_overrides
for insert
to authenticated
with check (
  (select auth.uid()) = '19bf3140-6738-496f-ac0c-20e316c4c3c0'::uuid
  and updated_by = (select auth.uid())
);

drop policy if exists "guide owner updates dota hero guide overrides"
  on public.dota_hero_guide_overrides;
create policy "guide owner updates dota hero guide overrides"
on public.dota_hero_guide_overrides
for update
to authenticated
using ((select auth.uid()) = '19bf3140-6738-496f-ac0c-20e316c4c3c0'::uuid)
with check (
  (select auth.uid()) = '19bf3140-6738-496f-ac0c-20e316c4c3c0'::uuid
  and updated_by = (select auth.uid())
);

drop policy if exists "guide owner deletes dota hero guide overrides"
  on public.dota_hero_guide_overrides;
create policy "guide owner deletes dota hero guide overrides"
on public.dota_hero_guide_overrides
for delete
to authenticated
using ((select auth.uid()) = '19bf3140-6738-496f-ac0c-20e316c4c3c0'::uuid);

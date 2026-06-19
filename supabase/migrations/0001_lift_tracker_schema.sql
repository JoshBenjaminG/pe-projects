-- Lift Tracker schema. Single-user, no-auth app: RLS is intentionally open
-- for the anon role on both tables (see project spec, "Auth and Access
-- Model"). Run against the Supabase project this site's anon/publishable
-- key points at (see js/lift-tracker/config.js).
--
-- NOTE: the original spec's data model table omitted `deleted_at` on
-- `lifts`, but the Features section requires soft-deleting a lift with
-- undo — that's not possible without it, so it's added here.

create table public.lifts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order integer not null default 0,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sets (
  id uuid primary key default gen_random_uuid(),
  lift_id uuid not null references public.lifts(id) on delete cascade,
  weight numeric(6,2) not null check (weight >= 0),
  reps integer not null check (reps > 0),
  performed_at timestamptz not null default now(),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_lifts_deleted_at on public.lifts (deleted_at);
create index idx_lifts_sort_order on public.lifts (sort_order);
create index idx_sets_lift_id on public.sets (lift_id);
create index idx_sets_performed_at on public.sets (performed_at);
create index idx_sets_deleted_at on public.sets (deleted_at);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = '';

create trigger lifts_set_updated_at
before update on public.lifts
for each row execute function public.set_updated_at();

create trigger sets_set_updated_at
before update on public.sets
for each row execute function public.set_updated_at();

alter table public.lifts enable row level security;
alter table public.sets enable row level security;

create policy "anon full access lifts" on public.lifts
  for all
  to anon
  using (true)
  with check (true);

create policy "anon full access sets" on public.sets
  for all
  to anon
  using (true)
  with check (true);

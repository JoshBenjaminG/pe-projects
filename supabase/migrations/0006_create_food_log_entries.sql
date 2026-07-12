create table if not exists public.food_log_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  title text not null check (char_length(trim(title)) > 0),
  calories integer not null check (calories > 0),
  logged_at timestamptz not null default now(),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_food_log_entries_user_id_logged_at
  on public.food_log_entries (user_id, logged_at desc);

create index if not exists idx_food_log_entries_deleted_at
  on public.food_log_entries (deleted_at);

drop trigger if exists food_log_entries_set_updated_at on public.food_log_entries;
create trigger food_log_entries_set_updated_at
before update on public.food_log_entries
for each row execute function public.set_updated_at();

alter table public.food_log_entries enable row level security;

grant select, insert, update, delete on public.food_log_entries to authenticated;

drop policy if exists "users manage own food log entries" on public.food_log_entries;
create policy "users manage own food log entries" on public.food_log_entries
  for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

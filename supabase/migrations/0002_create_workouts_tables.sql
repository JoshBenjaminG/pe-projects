-- Workouts: a named, user-owned filter over the lifts list. A workout is
-- just a saved set of lift memberships (workout_lifts), not a snapshot of
-- order/weights/etc -- the homepage list keeps using lifts.sort_order for
-- display order even when filtered to a workout's members.
create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  name text not null,
  sort_order integer not null default 0,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Plain many-to-many membership: which lifts belong to which workout. No
-- per-row ordering -- the create/edit page's yellow-line drag only decides
-- in-vs-out, and the filtered homepage list falls back to each lift's own
-- sort_order, so there's nothing else to persist per membership row.
create table public.workout_lifts (
  workout_id uuid not null references public.workouts(id) on delete cascade,
  lift_id uuid not null references public.lifts(id) on delete cascade,
  primary key (workout_id, lift_id)
);

create index idx_workouts_user_id on public.workouts (user_id);
create index idx_workouts_deleted_at on public.workouts (deleted_at);
create index idx_workouts_sort_order on public.workouts (sort_order);
create index idx_workout_lifts_lift_id on public.workout_lifts (lift_id);

create trigger workouts_set_updated_at
before update on public.workouts
for each row execute function public.set_updated_at();

alter table public.workouts enable row level security;
alter table public.workout_lifts enable row level security;

create policy "users manage own workouts" on public.workouts
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Mirrors the "users manage own sets" policy pattern: workout_lifts has no
-- user_id of its own, so ownership is checked by joining through the
-- parent workout, same as sets joins through lifts.
create policy "users manage own workout lifts" on public.workout_lifts
  for all
  to authenticated
  using (
    exists (
      select 1 from public.workouts
      where workouts.id = workout_lifts.workout_id
        and workouts.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.workouts
      where workouts.id = workout_lifts.workout_id
        and workouts.user_id = auth.uid()
    )
  );

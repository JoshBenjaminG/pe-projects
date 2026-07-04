-- Goals and goal/momentum events. Goals are user-owned, soft-deletable,
-- and intentionally typed so the app can support both manual entry and
-- pasted LLM-generated goal batches.

create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  title text not null,
  type text not null check (
    type in (
      'lift_set',
      'weekly_workout_days',
      'weekly_workout_volume',
      'workout_session_volume'
    )
  ),
  lift_id uuid references public.lifts(id),
  workout_id uuid references public.workouts(id),
  target_weight numeric(7,2) check (target_weight is null or target_weight >= 0),
  target_reps integer check (target_reps is null or target_reps > 0),
  target_value numeric(10,2) check (target_value is null or target_value >= 0),
  unit text not null default 'lb',
  timeframe_weeks integer check (timeframe_weeks is null or timeframe_weeks > 0),
  recurring text not null default 'none' check (recurring in ('none', 'weekly')),
  status text not null default 'active' check (status in ('active', 'achieved', 'archived')),
  achieved_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint goals_lift_set_fields check (
    type <> 'lift_set'
    or (lift_id is not null and target_weight is not null and target_reps is not null)
  ),
  constraint goals_weekly_workout_days_fields check (
    type <> 'weekly_workout_days'
    or target_value is not null
  ),
  constraint goals_weekly_workout_volume_fields check (
    type <> 'weekly_workout_volume'
    or (workout_id is not null and target_value is not null)
  ),
  constraint goals_workout_session_volume_fields check (
    type <> 'workout_session_volume'
    or (workout_id is not null and target_value is not null)
  )
);

create table public.goal_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  goal_id uuid references public.goals(id) on delete cascade,
  source_type text not null check (source_type in ('goal', 'achievement')),
  source_key text not null,
  event_type text not null check (event_type in ('close', 'achieved')),
  threshold numeric(5,2),
  title text not null,
  message text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_goals_user_id on public.goals (user_id);
create index idx_goals_status on public.goals (status);
create index idx_goals_deleted_at on public.goals (deleted_at);
create index idx_goals_lift_id on public.goals (lift_id);
create index idx_goals_workout_id on public.goals (workout_id);
create index idx_goal_events_user_id_created_at on public.goal_events (user_id, created_at desc);
create index idx_goal_events_goal_id on public.goal_events (goal_id);
create unique index idx_goal_events_goal_threshold_unique
  on public.goal_events (user_id, goal_id, event_type, threshold)
  where goal_id is not null;
create unique index idx_goal_events_achievement_unique
  on public.goal_events (user_id, source_key, event_type)
  where source_type = 'achievement';

create trigger goals_set_updated_at
before update on public.goals
for each row execute function public.set_updated_at();

alter table public.goals enable row level security;
alter table public.goal_events enable row level security;

grant select, insert, update, delete on public.goals to authenticated;
grant select, insert, update, delete on public.goal_events to authenticated;

create policy "users manage own goals" on public.goals
  for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "users manage own goal events" on public.goal_events
  for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

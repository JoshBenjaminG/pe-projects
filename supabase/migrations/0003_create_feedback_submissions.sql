-- Tiny log of feedback-modal submissions, used only to gate the
-- "One Wish Willow" secret achievement (see killstreak.js). Intentionally
-- has no message content -- the feedback text itself still only goes out
-- via the mailto: link in feedbackModal.js, never touches the database.
create table public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now()
);

create index idx_feedback_submissions_user_id on public.feedback_submissions (user_id);

alter table public.feedback_submissions enable row level security;

create policy "users manage own feedback submissions" on public.feedback_submissions
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

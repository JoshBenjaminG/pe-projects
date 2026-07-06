alter table public.lifts
  add column if not exists dictionary_key text;

create index if not exists idx_lifts_dictionary_key
  on public.lifts (dictionary_key);

update public.lifts
set dictionary_key = case
  when lower(name) in ('bicep curls') then 'bicep-curl'
  when lower(name) in ('forearm twists') then 'forearm-twist'
  when lower(name) in ('tricep curls') then 'tricep-curl'
  when lower(name) in ('hip thrust') then 'hip-thrust'
  when lower(name) in ('bench press 2', 'bench press 3', 'bench press warmup') then 'bench-press'
  when lower(name) in ('calf raise') then 'calf-raise'
  when lower(name) in ('dumbell chest press') then 'dumbbell-chest-press'
  when lower(name) in ('dumbell curl') then 'dumbbell-curl'
  when lower(name) in ('dumbell lateral raise') then 'dumbbell-lateral-raise'
  when lower(name) in ('dumbell row') then 'dumbbell-row'
  when lower(name) in ('dumbell shoulder press') then 'dumbbell-shoulder-press'
  when lower(name) in ('hammer curl') then 'hammer-curl'
  when lower(name) in ('lunge') then 'lunge'
  when lower(name) in ('overhead tricep extension') then 'overhead-tricep-extension'
  when lower(name) in ('rear delt fly') then 'rear-delt-fly'
  when lower(name) in ('rows') then 'row'
  when lower(name) in ('shrugs') then 'shrug'
  when lower(name) in ('squat 2', 'squat 3', 'squat warmup') then 'squat'
  when lower(name) in ('weighted sit ups', 'weighted sit ups 2') then 'weighted-sit-up'
  else dictionary_key
end
where dictionary_key is null;

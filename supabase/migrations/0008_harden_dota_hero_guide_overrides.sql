alter table public.dota_hero_guide_overrides
  add constraint dota_hero_guide_overrides_roles_check
  check (
    roles <@ array[
      'Safe Lane (Pos 1)',
      'Mid Lane (Pos 2)',
      'Off Lane (Pos 3)',
      'Support (Pos 4)',
      'Hard Support (Pos 5)'
    ]::text[]
  );

create index if not exists idx_dota_hero_guide_overrides_updated_by
  on public.dota_hero_guide_overrides (updated_by);

alter table public.dota_hero_guide_overrides
  drop constraint if exists dota_hero_guide_overrides_roles_check;

update public.dota_hero_guide_overrides
set roles = array(
  select case role
    when 'Safe Lane (Pos 1)' then 'Safe Lane'
    when 'Mid Lane (Pos 2)' then 'Mid Lane'
    when 'Off Lane (Pos 3)' then 'Off Lane'
    when 'Support (Pos 4)' then 'Support'
    when 'Hard Support (Pos 5)' then 'Hard Support'
    else role
  end
  from unnest(roles) as role
);

alter table public.dota_hero_guide_overrides
  add constraint dota_hero_guide_overrides_roles_check
  check (
    roles <@ array[
      'Safe Lane',
      'Mid Lane',
      'Off Lane',
      'Support',
      'Hard Support'
    ]::text[]
  );

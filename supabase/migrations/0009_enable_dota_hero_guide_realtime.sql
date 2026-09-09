do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'dota_hero_guide_overrides'
  ) then
    alter publication supabase_realtime
      add table public.dota_hero_guide_overrides;
  end if;
end
$$;

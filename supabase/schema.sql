-- Schéma Supabase de TBL (déjà appliqué au projet). Conservé ici pour référence et pour recréer la base si besoin.
-- Les adresses autorisées dans l'admin se gèrent dans la table admin_users (voir ADMIN_TBL.md).

create table public.admin_users (email text primary key);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email','')));
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create table public.players (
  slug text primary key, name text not null, nickname text, number int, height text not null,
  division text not null check (division in ('Lightweight','Middleweight','Heavyweight')),
  photo text, champion boolean not null default false, wins int, losses int,
  other_source text, other_wins int, other_losses int, videos text[] not null default '{}',
  note text, sort int not null default 0
);
create table public.events (
  slug text primary key, name text not null, subtitle text, status text not null check (status in ('À venir','Passé')),
  date_label text not null, time text, city text, venue text, access text, image text not null, sort int not null default 0
);
create table public.matches (
  id bigint generated always as identity primary key,
  event_slug text not null references public.events(slug) on delete cascade,
  game int not null, label text not null,
  division text not null check (division in ('Lightweight','Middleweight','Heavyweight')),
  title boolean not null default false, tryout boolean not null default false,
  player_a text not null references public.players(slug), player_b text not null references public.players(slug),
  poster text not null, poster_alt text not null default '',
  winner text references public.players(slug), result_detail text,
  unique (event_slug, game)
);
create table public.rankings (
  division text not null check (division in ('Lightweight','Middleweight','Heavyweight')),
  player_slug text not null references public.players(slug) on delete cascade,
  position int not null, wins int not null default 0, losses int not null default 0, champion boolean not null default false,
  primary key (division, player_slug)
);
create table public.video_overrides (
  video_id text primary key,
  kind text not null check (kind in ('Matchs complets','Highlights','Teasers')),
  hidden boolean not null default false
);
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(),
  category text not null check (category in ('joueur','partenaire','sponsor','media','general')),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200 and email like '%_@_%._%'),
  message text not null check (char_length(message) between 5 and 5000),
  handled boolean not null default false
);

alter table public.admin_users enable row level security;
alter table public.players enable row level security;
alter table public.events enable row level security;
alter table public.matches enable row level security;
alter table public.rankings enable row level security;
alter table public.video_overrides enable row level security;
alter table public.contact_messages enable row level security;

create policy "admins read admins" on public.admin_users for select to authenticated using (public.is_admin());

do $$ declare t text; begin
  foreach t in array array['players','events','matches','rankings','video_overrides'] loop
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true)', t);
    execute format('create policy "admin insert" on public.%I for insert to authenticated with check (public.is_admin())', t);
    execute format('create policy "admin update" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    execute format('create policy "admin delete" on public.%I for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;

create policy "anyone sends message" on public.contact_messages for insert to anon, authenticated with check (handled = false);
create policy "admin reads messages" on public.contact_messages for select to authenticated using (public.is_admin());
create policy "admin updates messages" on public.contact_messages for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin deletes messages" on public.contact_messages for delete to authenticated using (public.is_admin());

insert into storage.buckets (id, name, public) values ('player-photos','player-photos', true) on conflict (id) do nothing;
create policy "photos public read" on storage.objects for select using (bucket_id = 'player-photos');
create policy "photos admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'player-photos' and public.is_admin());
create policy "photos admin update" on storage.objects for update to authenticated using (bucket_id = 'player-photos' and public.is_admin());
create policy "photos admin delete" on storage.objects for delete to authenticated using (bucket_id = 'player-photos' and public.is_admin());


# Espace administrateur TBL

Adresse : `/admin` (non indexée par Google). Connexion par e-mail + mot de passe.

## Donner accès à quelqu'un (une fois)
1. Supabase → Authentication → Users → **Add user** : e-mail + mot de passe (cocher « Auto Confirm User »).
2. Supabase → SQL Editor : `insert into public.admin_users (email) values ('adresse@exemple.com');`
Sans cette 2e étape, le compte se connecte mais n'a aucun droit (accès refusé).
Pour retirer l'accès : `delete from public.admin_users where email = 'adresse@exemple.com';`

## Ce que l'admin permet
- **Joueurs** : créer / modifier / supprimer, photo officielle (envoi direct), victoires et défaites, champion, vidéos, note.
- **Classements** : ordre par division, bilan, champion (couronne). Liste vide = « pas encore communiqué ».
- **Matchs & événements** : vainqueur et score de chaque match de TBL 02 (alimente l'onglet Résultats), infos des événements.
- **Vidéos** : catégorie de chaque vidéo YouTube (matchs complets, highlights, teasers) ou masquage.
- **Messages** : formulaire de contact (catégorie, traité / non traité).

Les changements apparaissent sur le site en moins d'une minute. Si Supabase est injoignable, le site affiche les données du code (`src/data/`).

## Variables d'environnement (Vercel + `.env.local`)
`NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` (voir `.env.example`).

## Base de données
`supabase/schema.sql` (tables + règles de sécurité) et `supabase/seed.sql` (données de départ). Déjà appliqués.

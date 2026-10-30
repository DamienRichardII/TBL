# TBL — The Ballin League (frontend)

Frontend uniquement : Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS 3, Motion, lucide-react.
Aucun backend : pas d'API, base de données, authentification, paiement, e-mail ni réservation réelle.

## Commandes
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production (typecheck + lint inclus)
npm start
```

## Routes
| Route | Contenu |
|---|---|
| `/` | Hero, raccourcis, prochain événement TBL 02, bandeau, arguments |
| `/evenements` | Catalogue + filtres (Tous / 1vs1 / Tournois / Show / Passés) |
| `/evenements/tbl-02-the-throne` | Fiche événement, onglets Infos / Matchs & joueurs / Galerie |
| `/joueurs`, `/joueurs/[slug]` | 16 joueurs, filtre division + recherche, fiches |
| `/classement` | Onglets par division — message « classement non communiqué » |
| `/videos` | Espace Live (futurs événements) + vidéos à venir |
| `/a-propos` | Présentation, fondateurs, divisions, titres (règle à valider) |
| `/contact` | Formulaire visuel, n'envoie rien |
| `/boutique` | « Prochainement » |
| `/reservation/tbl-02-the-throne` | Prototype gratuit, sans validation réelle, aperçu de confirmation marqué DÉMO |

## Structure
- `src/data/` : joueurs, matchs, événements, navigation (données locales typées)
- `src/types/` : modèles · `src/lib/assets.ts` : table centralisée des images
- `src/components/` : composants réutilisables · `public/img/` : images optimisées (WebP) issues de `assets/`

Les originaux restent dans `assets/` (non modifiés). Voir `ASSETS_MANQUANTS.md` et `POINTS_A_VALIDER_TBL.md`.

## Backend (Supabase)
Les joueurs, matchs, événements, classements, catégories de vidéos et messages de contact vivent dans Supabase et se gèrent depuis `/admin` (voir `ADMIN_TBL.md`). Variables : `.env.example`. Sans ces variables, le site affiche les données de `src/data/`.

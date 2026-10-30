# Points à valider avec TBL

## Différences imposées par les PDF officiels (par rapport à la maquette)
- Billetterie : TBL 02 est **gratuit sur réservation** → tarifs 25 / 50 / 100 €, paiement Stripe et carte bancaire retirés.
- Pas de livestream pour TBL 02 → « Live YouTube » retiré de la fiche événement ; module Live conservé pour les événements futurs.
- Retirés : « 10 000 € », « +1000 spectateurs », événements TBL Paris / TBL Summer, vidéos nommées.
- Lieu : gymnase Victor Fouillade, orthographe et adresse **à confirmer** (aucune carte ni adresse inventée).
- Classements : non communiqués → aucun rang affiché.

## À confirmer
1. **Horaire sur l'affiche** : l'affiche TBL 02 mentionne « 16 – 23 » alors que le dossier indique début à 18 h. Le site affiche 18 h.
2. **Orthographe Kieran** : les PDF disent « Kieran », l'affiche du Game 8 indique « KERAN ».
3. Surnom de Kieran : non officiel → non affiché.
4. Règle des 3 victoires TBL sans défaite pour le titre : marquée « à valider ».
5. Bilans : seuls Samuel (3 V – 1 D) et Kieran (1 V – 0 D) sont affichés comme bilans TBL ; Curtis (TapeUp 2–1) et Desmo (TapeUp 2–0) sont étiquetés hors TBL. Les autres : « Bilan TBL à confirmer » (jamais 0–0).
6. Numéros et surnoms de tous les joueurs (validation demandée par le dossier).
7. TBL 01 : date et lieu inconnus, affiché « Passé — date à confirmer ». Photos de galerie présentées comme « événements TBL précédents ».
8. Nombre maximum de places par réservation (prototype limité à 10, signalé à confirmer).
9. Bloc « Arguments » de l'accueil reformulé (maquette : paiement sécurisé, diffusion live…) pour rester conforme au dossier.

## Retours client (version 2) — état
Faits côté frontend : bannière TBL 02 + compte à rebours, matchs en avant, boutons YouTube (accueil, menu, vidéos), vidéos YouTube lisibles sur le site (flux public de la chaîne, mis à jour toutes les heures), catégories de vidéos (classement automatique par mots-clés du titre), section Live prête (`LIVE_VIDEO_ID` dans `src/data/site.ts`), classements prêts à être remplis (`src/data/rankings.ts`, champion = couronne), profils joueurs (photo, bilan, historique, vidéos), onglet Résultats, page TBL 01, partenaires, boutique « Coming soon », mentions légales et confidentialité (brouillons), palette noir / or / blanc.

En attente (nécessite le feu vert backend ou des éléments TBL) :
1. **Billetterie réelle** : renseigner `TICKETING_URL` dans `src/data/site.ts` → tous les boutons « Réserver ma place » pointent dessus et le prototype disparaît.
2. **Espace administrateur** (joueurs, bilans, classements, événements, vidéos, actus) : backend, non démarré.
3. **Formulaire de contact fonctionnel** : backend + e-mail officiel de TBL.
4. QR code / contrôle des billets : géré par la plateforme de billetterie choisie.
5. Photos officielles des joueurs : ajouter dans `public/img/players/` puis renseigner `photo` dans `src/data/players.ts`.
6. Mentions légales / confidentialité : compléter les champs entre crochets (éditeur, SIRET, adresse, e-mail).
7. Orthographe « Kieran » (PDF) ou « Keran » (affiche et titres des vidéos YouTube) : à trancher.
8. Horaire de l'affiche (« 16-23 ») vs 18 h du dossier.


## Backend Supabase (v3) — état
Fait : base de données (joueurs, matchs, événements, classements, catégories de vidéos, messages), espace `/admin` (voir `ADMIN_TBL.md`), formulaire de contact enregistré dans la base, catégories de vidéos corrigeables.
À faire par TBL / DamCompany :
1. Créer les comptes administrateurs (procédure dans `ADMIN_TBL.md`) : aucune adresse n'est autorisée tant que cela n'est pas fait.
2. Fournir l'adresse e-mail officielle : les messages sont pour l'instant consultés dans l'admin, sans envoi d'e-mail. L'envoi (ex. Resend) sera ajouté ensuite.
3. Les bilans ne sont pas recalculés automatiquement après un match : les mettre à jour dans l'onglet Joueurs.
4. Accès payant au livestream : non prévu à ce stade.

-- 1) Noms (prénoms uniquement) et fautes
update public.players set name='Samuel' where slug='samuel-marwakal';
update public.players set name='Keran' where slug='kieran';
update public.players set name='Kenny' where slug='kenny-brown';
update public.players set name='Bryan' where slug='bryan-pamba';
update public.players set name='Tiegbe' where slug='tiegbe-bamba';
update public.matches set poster_alt = replace(poster_alt,'Kieran','Keran');
-- 2) Bilans TBL officiels (PDF octobre 2026)
update public.players set wins=3, losses=1 where slug='samuel-marwakal';
update public.players set wins=1, losses=0 where slug='kieran';
update public.players set wins=1, losses=1 where slug='kenny-brown';
update public.players set wins=0, losses=1 where slug='tiegbe-bamba';
update public.players set wins=0, losses=1 where slug='chris';
update public.players set wins=0, losses=0 where slug='aurelien';
update public.players set wins=0, losses=0 where slug='bryan-pamba';
update public.players set wins=0, losses=0 where slug='yanis';
update public.players set wins=0, losses=0 where slug='curtis';
update public.players set wins=0, losses=0 where slug='adama';
update public.players set wins=0, losses=0 where slug='leian';
update public.players set wins=0, losses=0 where slug='sebastien';
update public.players set wins=0, losses=0 where slug='imran';
update public.players set wins=0, losses=0 where slug='desmo';
update public.players set wins=0, losses=0 where slug='dani';
update public.players set wins=0, losses=0 where slug='matthias';
-- 3) Classement général
delete from public.rankings;
insert into public.rankings (division,player_slug,position,wins,losses,champion) values ('Middleweight','samuel-marwakal',1,3,1,false),('Middleweight','kieran',2,1,0,false),('Middleweight','kenny-brown',3,1,1,false),('Heavyweight','tiegbe-bamba',4,0,1,false),('Heavyweight','chris',5,0,1,false),('Heavyweight','aurelien',6,0,0,false),('Middleweight','bryan-pamba',7,0,0,false),('Lightweight','yanis',8,0,0,false),('Lightweight','curtis',9,0,0,false),('Lightweight','adama',10,0,0,false),('Lightweight','leian',11,0,0,false),('Lightweight','sebastien',12,0,0,false),('Lightweight','imran',13,0,0,false),('Heavyweight','desmo',14,0,0,false),('Middleweight','dani',15,0,0,false),('Middleweight','matthias',16,0,0,false);

-- 4) Photos joueurs (extraites des affiches TBL 02)
update public.players set photo='/img/players/samuel-marwakal.webp' where slug='samuel-marwakal';
update public.players set photo='/img/players/kieran.webp' where slug='kieran';
update public.players set photo='/img/players/kenny-brown.webp' where slug='kenny-brown';
update public.players set photo='/img/players/bryan-pamba.webp' where slug='bryan-pamba';
update public.players set photo='/img/players/aurelien.webp' where slug='aurelien';
update public.players set photo='/img/players/tiegbe-bamba.webp' where slug='tiegbe-bamba';
update public.players set photo='/img/players/adama.webp' where slug='adama';
update public.players set photo='/img/players/leian.webp' where slug='leian';
update public.players set photo='/img/players/yanis.webp' where slug='yanis';
update public.players set photo='/img/players/curtis.webp' where slug='curtis';
update public.players set photo='/img/players/dani.webp' where slug='dani';
update public.players set photo='/img/players/matthias.webp' where slug='matthias';
update public.players set photo='/img/players/desmo.webp' where slug='desmo';
update public.players set photo='/img/players/chris.webp' where slug='chris';
update public.players set photo='/img/players/sebastien.webp' where slug='sebastien';
update public.players set photo='/img/players/imran.webp' where slug='imran';

# nascasa

Webapp de gestion de photos pour nas / serveur en locale (fonctione en non locale mais déconceillé pour le moment)

## Dépendance

Le but est d'avoir le minimum de dépendance logiciel et cross-plateform .

Avec Docker | Sans Docker
------------ | ------------
docker, (fichier run-me.sh) | python 3 pour avoir pyp -> lib graphique

### direction

[IN PROGRESS]server side -> instalation, affichage basique, configuration.


[CLOSE]client side -> call sur api des photos et includes à distances.


# TO-Do

-> : A faire
+> : fait

## Server side

* coeur de la recherche d'image 

	+> ajuster par rapport a public ? ou path relatif (ex `../../mesphotos`)

	+> Boucle sur variable config contenant les paths autorisé

	+> Route sur recherche pour lancer la recherche.

	+> Vérification des doublons a voir si prend pas trops de ressources (nop pour 100 elements, a voir avec plus)
	
	-> panel de choix de path a explorer
	-> gestion des espace dans les noms de fichier cassé depuis le passage docker

* panneau de config

	-> config dans la db ou en static ?
	
* ajout gestion d'utilisateur ? (secu des photos / en vue de l'app client side)

* Gestion des catégories

	-> table a part/faire des union entre table categorie-images ou tag dans l'images ?
	
	-> listage auto des categories dans le nav

## Ressources

https://rvera.github.io/image-picker/ selection d'images multiple

https://kimmobrunfeldt.github.io/progressbar.js/ loading de l'exploration des fichiers

http://codepen.io/collection/tIjGb/

http://velocityjs.org/
import { startServer } from "ws-server";
import { Observable } from "rxjs";
import { action } from "player/action/node";
import { getGame } from "player/get-game/node";
import { observeGame } from "player/observe-game/node";
import { getMyCharacter } from "player/get-my-character/node";
import { observeMyCharacter } from "player/observe-my-character/node";
import { Connexion } from "link";

const connexions$: Observable<Connexion> = startServer();
action(connexions$);
getGame(connexions$);
observeGame(connexions$);
getMyCharacter(connexions$)
observeMyCharacter(connexions$);

import { startServer, Connexion } from "ws-server";
import { Observable } from "rxjs";
import { action } from "player/action/node";
import { getGame } from "player/get-game/node";
import { observeGame } from "player/observe-game/node";
import { getMyPlayer } from "player/get-my-player/node";
import { observeMyPlayer } from "player/observe-my-player/node";

const connexions$: Observable<Connexion> = startServer();
action(connexions$);
getGame(connexions$);
observeGame(connexions$);
getMyPlayer(connexions$)
observeMyPlayer(connexions$);

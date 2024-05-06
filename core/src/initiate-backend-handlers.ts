import { Observable } from "rxjs";
import { Connection } from "connection-types";

import {
    Message,
    interactHandle,
    getGameHandle,
    observeGameHandle,
    getMyCharacterHandle,
    observeMyCharacterHandle,
    GameStorage
} from "core";

export function initiateBackendHandlers(
    gameStorage: GameStorage,
    connexion$: Observable<Connection<Message>>
) {
    interactHandle(gameStorage, connexion$);
    getGameHandle(gameStorage, connexion$);
    observeGameHandle(gameStorage, connexion$);
    getMyCharacterHandle(gameStorage, connexion$);
    observeMyCharacterHandle(gameStorage, connexion$);
}
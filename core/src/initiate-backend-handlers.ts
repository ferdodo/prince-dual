import type { Observable } from "rxjs";
import type { Connection } from "connection-types";
import type { Message, GameStorage } from "core/types";

import {
    interactHandle,
    getGameHandle,
    observeGameHandle,
    getMyCharacterHandle,
    observeMyCharacterHandle
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
import { Character } from "character";
import { Observable, filter, map } from "rxjs";
import { Connection } from "connection-types";
import { Message } from "../message";

export function observeMyCharacter(connection: Connection<Message>): Observable<Character> {
	return connection.messages$.pipe(
		map(m => m.observeMyCharacterBroadcast?.character),
		filter(Boolean)
	);
}

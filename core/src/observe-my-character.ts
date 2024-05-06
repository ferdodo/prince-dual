import { Character, Message } from "core";
import { Observable, filter, map } from "rxjs";
import { Connection } from "connection-types";

export function observeMyCharacter(connection: Connection<Message>): Observable<Character> {
	return connection.messages$.pipe(
		map(m => m.observeMyCharacterBroadcast?.character),
		filter(Boolean)
	);
}

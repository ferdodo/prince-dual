import type { Character, Message } from "core";
import { type Observable, filter, map } from "rxjs";
import type { Connection } from "connection-types";

export function observeMyCharacter(connection: Connection<Message>): Observable<Character> {
	return connection.messages$.pipe(
		map(m => m.observeMyCharacterBroadcast?.character),
		filter(Boolean)
	);
}

import { Observable } from "rxjs";

export type Message = {
	eventType: string,
	content?: any
}

export type Connexion = {
	id: number;
	messages$: Observable<Message>,
	send: (payload: Message) => void
}

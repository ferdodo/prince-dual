import { Observable } from "rxjs";
import { Game } from "core";

export interface GameStorage {
	read: () => Game;
	save: (update: Partial<Game>) => void;
	watch: () => Observable<Game>;
}

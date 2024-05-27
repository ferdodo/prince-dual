import type { Observable } from "rxjs";
import type { Game } from "core";

export interface GameStorage {
	read: () => Game;
	save: (update: Partial<Game>) => void;
	watch: () => Observable<Game>;
}

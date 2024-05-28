import type { Observable } from "rxjs";
import type { Game } from "core/types";

export interface GameStorage {
	read: () => Game;
	save: (update: Partial<Game>) => void;
	watch: () => Observable<Game>;
}

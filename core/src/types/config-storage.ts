import type { Config } from "core";
import type { Observable } from "rxjs";

export interface ConfigStorage {
	read: () => Config;
	save: (config: Partial<Config>) => void;
	watch: () => Observable<Config>;
}

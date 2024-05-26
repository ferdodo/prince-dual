import { Observable } from "rxjs";
import { Config } from "core";

export interface ConfigStorage {
	read: () => Config;
	save: (config: Partial<Config>) => void;
	watch: () => Observable<Config>;
}

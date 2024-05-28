import type { ConfigStorage, Config } from "core/types";
import { Subject } from "rxjs";

export function createConfigStorage(_config: Config): ConfigStorage {
    let config = { ..._config };
    const _config$: Subject<Config> = new Subject();

    return {
        read() {
            return { ...config };
        },
        save(update) {
            config = {
                ...config,
                ...update
            };

            _config$.next(config);
        },
        watch() {
            return _config$.asObservable();
        }
    }
}
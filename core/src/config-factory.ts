import { Config } from "core";

export class ConfigFactory {
    build(): Config {
        return {
            webProtocol: "http",
            webDomain: "example.org",
            webPort: 80,
            wsProtocol: "ws",
            wsPort: 8080,
            offlineMode: false
        };
    }
}
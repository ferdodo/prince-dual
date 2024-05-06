import { startServer } from "./start-server";
import { initiateBackendHandlers, createGameStorage } from "core";

const connexions$ = startServer();
const gameStorage = createGameStorage();
initiateBackendHandlers(gameStorage, connexions$);
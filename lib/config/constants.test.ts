import {
	WEB_PROTOCOL,
	WEB_DOMAIN,
	WEB_PORT,
	WS_PROTOCOL,
	WS_PORT,
	OFFLINE_MODE
} from "./dist/constants";

import assert from "assert/strict";

assert(WEB_PROTOCOL);
assert(WEB_DOMAIN);
assert(WEB_PORT);
assert(WS_PROTOCOL);
assert(WS_PORT);
assert(typeof WEB_PROTOCOL === "string");
assert(typeof WEB_DOMAIN === "string");
assert(typeof WEB_PORT === "number");
assert(typeof WS_PROTOCOL === "string");
assert(typeof WS_PORT === "number");
assert(typeof OFFLINE_MODE === "boolean");

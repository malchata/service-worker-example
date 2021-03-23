import { eventInstall } from "./lib/event-install.js";
import { eventFetch } from "./lib/event-fetch.js";
import { eventActivate } from "./lib/event-activate.js";

self.addEventListener("install", eventInstall);
self.addEventListener("fetch", eventFetch);
self.addEventListener("activate", eventActivate);

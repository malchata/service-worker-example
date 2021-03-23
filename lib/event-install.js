import { CACHE_NAME, CACHED_ASSETS } from "./constants.js";

export const eventInstall = event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(CACHED_ASSETS);
  }).then(() => {
    return self.skipWaiting();
  }));
};

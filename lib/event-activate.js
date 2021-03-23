import { CACHE_NAME, PRELOAD_AVAILABLE } from "./constants.js";

export const eventActivate = event => {
  event.waitUntil(caches.keys().then(keys => {
    return Promise.all([
      keys.filter(key => {
        return key !== CACHE_NAME;
      }).map(key => {
        return caches.delete(key);
      }),
      self.clients.claim(),
      PRELOAD_AVAILABLE ? self.registration.navigationPreload.enable() : true
    ]);
  }));
};

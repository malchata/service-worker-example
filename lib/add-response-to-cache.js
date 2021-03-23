import { CACHE_NAME } from "./constants.js";

export const addResponseToCache = (request, response) => {
  caches.open(CACHE_NAME).then(cache => {
    cache.put(request, response);
  });
};

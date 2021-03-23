import { STATIC_ASSETS } from "./constants.js";
import { conditions } from "./conditions.js";
import { addResponseToCache } from "./add-response-to-cache.js";
import { mergeResponses } from "./merge-responses.js";

export const eventFetch = async event => {
  const { request } = event;
  const { url, method, mode } = request;

  if (conditions(method, url)) {
    return;
  }

  // Static asset requests
  if (STATIC_ASSETS.test(url)) {
    event.respondWith(caches.match(url).then(cachedResponse => {
      return cachedResponse || fetch(request).then(fetchedResponse => {
        addResponseToCache(request, fetchedResponse.clone());

        return fetchedResponse;
      });
    }));

    return;
  }

  // HTML requests
  if (mode === "navigate") {
    const networkContent = Promise.resolve(event.preloadResponse).then(response => {
      if (response) {
        addResponseToCache(request, response.clone());

        return response;
      }

      // If the navigation preload response can't be used/is unavailable, we
      // still want to get a partial from the server, so we set this custom
      // `X-Content-Mode` header which the back end will use to serve partials.
      const headers = new Headers();
      headers.append("X-Content-Mode", "partial");

      return fetch(url, {
        headers
      }).then(response => {
        addResponseToCache(request, response.clone());

        return response;
      });
    }).catch(() => {
      return caches.match(url);
    });

    const { done, response } = await mergeResponses([
      caches.match("/partial-header"),
      networkContent,
      caches.match("/partial-footer")
    ]);

    event.waitUntil(done);
    event.respondWith(response);
  }
};

import { css, js } from "./assets.json";

// The cache name is replaced by a text replacement plugin.
export const CACHE_NAME = "__cache_name__";
export const CACHED_ASSETS = [
  "/partial-header",
  "/partial-footer",
  ...css.map(cssFile => `/dist/css/${cssFile}`),
  ...js.map(jsFile => `/dist/js/${jsFile}`),
];
export const PRELOAD_AVAILABLE = "navigationPreload" in self.registration;
export const STATIC_ASSETS = /\.(woff2?|css|m?js|gif|avif|webp|png|svg|jpe?g|txt|ico)$/i;

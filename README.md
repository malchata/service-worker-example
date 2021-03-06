# Streaming service worker example

If you're interested in what it takes to build a Service Worker using [Navigation Preload](https://developers.google.com/web/updates/2017/02/navigation-preload) and [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) to stream content partials from the server and assemble them with precached header and footer partials without using [Workbox](https://developers.google.com/web/tools/workbox), this example repo is for you. This repo is meant to be a companion for [my article on A List Apart about faster Service Workers](https://alistapart.com/article/now-thats-what-i-call-service-worker/).

This also shows how one might use a build toolchain with a generated asset manifest (such as the one generated by [gulp-asset-manifest](https://www.npmjs.com/package/gulp-asset-manifest) in the `lib` directory). [Rollup](https://rollupjs.org/) is used to generate the optimized service worker in [IIFE format](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).

## Build

To build, clone this repo and run `npm install`. Then run `npm run build`. An unoptimized Service Worker and its sourcemap will be written to the `dist` folder.

## Caution

This server worker contains asset references from an example asset manifest that won't be useful for you! Don't use the output of this repo in any production application. It's asking for trouble! This repo is for educational purposes only!

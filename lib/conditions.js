export const conditions = (method, url) => {
  return [
    method === "GET",
    url.indexOf("google-analytics.com") === -1,
    url.indexOf("syndication.twitter.com") === -1,
    url.indexOf("pbs.twimg.com") === -1,
    /\.map$/i.test(url) === false
  ].indexOf(false) !== -1;
};

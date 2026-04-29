export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const redirectFrom = new Set([
      "jiashuoz.com",
      "www.jiashuoz.com",
      "www.joshz.ai",
    ]);
    if (redirectFrom.has(url.hostname)) {
      url.hostname = "joshz.ai";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};

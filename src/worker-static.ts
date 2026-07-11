export default {
  async fetch(request: Request, env: { ASSETS: { fetch: (request: Request) => Promise<Response> } }) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return Response.redirect(`${url.origin}/zh`, 302);
    }

    return env.ASSETS.fetch(request);
  },
};

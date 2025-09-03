// deployments/alchemy-worker/src/neither.ts
var neither_default = {
  // biome-ignore lint/suspicious/useAwait: its fine
  async fetch(request, _env) {
    const url = new URL(request.url);
    const message = url.searchParams.get("message");
    console.log("[NEITHER] Received request with message:", message);
    return new Response("Error adding message to queue", { status: 500 });
  }
};
export {
  neither_default as default
};
//# sourceMappingURL=neither.js.map

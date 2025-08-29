// deployments/alchemy-worker/src/patpat.ts
var patpat_default = {
  // biome-ignore lint/suspicious/useAwait: its fine
  async fetch() {
    console.log("test");
    return new Response("Haiii - patpat!");
  }
};
export {
  patpat_default as default
};
//# sourceMappingURL=patpat.js.map

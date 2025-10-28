import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

export const app = await alchemy("bad-stack-trace", {
  stage: "bug",
});

export const patpat = await Worker("error-worker", {
  entrypoint: "./deployments/alchemy-worker/src/patpat.ts",
  url: true,
});

await app.finalize();

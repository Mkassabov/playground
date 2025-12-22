import alchemy from "alchemy";
import { Worker, WranglerJson } from "alchemy/cloudflare";

export const app = await alchemy("app", {
  password: "test",
});

const worker = await Worker("form-builder", {
  entrypoint: "./deployments/alchemy-worker/src/patpat.ts",
});

await WranglerJson({ worker });

console.log(worker);

await app.finalize();

import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

export const app = await alchemy("test-app", {
  password: "test",
});

const worker = await Worker("patpat", {
  entrypoint: "./deployments/alchemy-worker/src/patpat.ts",
});

console.log(worker)

await app.finalize();

import alchemy from "alchemy";
import { Worker, WranglerJson, Hyperdrive } from "alchemy/cloudflare";

export const app = await alchemy("app", {
  password: "test",
});

const worker = await Worker("patpat", {
  entrypoint: "./deployments/alchemy-worker/src/patpat.ts",
});

console.log(worker);

await app.finalize();

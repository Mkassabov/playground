import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

export const app = await alchemy("tunnel-test", {
  password: "test",
});

const worker = await Worker("patpat", {
  entrypoint: "./src/patpat.ts",
  dev: {
    tunnel: true,
  },
});

console.log(worker);

await app.finalize();

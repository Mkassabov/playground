import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

export const app = await alchemy("alchemy-try-test");

export const patpat = await Worker("made-by-alchemy-test", {
	entrypoint: "./deployments/alchemy-worker/src/patpat.ts",
	url: true,
});

await app.finalize();

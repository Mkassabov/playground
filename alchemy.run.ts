import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

export const app = await alchemy("alchemy-test", {
	telemetry: false,
});

export const patpat = await Worker("patpat", {
	entrypoint: "./deployments/alchemy-worker/src/patpat.ts",
	url: true,
});

await app.finalize();

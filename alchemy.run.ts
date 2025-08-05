import alchemy from "alchemy";
import { DurableObjectNamespace, Worker } from "alchemy/cloudflare";
import type { Counter } from "./deployments/alchemy-worker/src/patpat";

// import { File } from "alchemy/fs";

const counter = DurableObjectNamespace<Counter>("Counter", {
	className: "Counter",
	sqlite: true,
});
export const app = await alchemy("alchemy-test", {
	stage: "dev",
	phase: process.argv.includes("--destroy") ? "destroy" : "up",
	password: process.env.ALCHEMY_PASSWORD,
	telemetry: false,
});

export const worker = await Worker("patpat", {
	script: "./deployments/alchemy-worker/src/patpat.ts",
	bindings: {
		COUNTER: counter,
	},
});

await app.finalize();

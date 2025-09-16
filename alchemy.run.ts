import alchemy from "alchemy";
import { Worker, WorkerRef, Self } from "alchemy/cloudflare";
import type { TapTapEntrypoint } from "./deployments/alchemy-worker/src/taptap";
import type { PatPatEntrypoint } from "./deployments/alchemy-worker/src/patpat";

export const app = await alchemy("entrypoint-test", {
	telemetry: false,
});

export const taptap = await Worker("taptap", {
	name: "et-test-taptap",
	entrypoint: "./deployments/alchemy-worker/src/taptap.ts",
	url: true,
});

export const taptapRef = await WorkerRef({
	service: "et-test-taptap",
});

export const patpat = await Worker("patpat", {
	entrypoint: "./deployments/alchemy-worker/src/patpat.ts",
	url: true,
	bindings: {
		TAPTAP: Worker.entrypoint<TapTapEntrypoint>(taptap, "TapTapEntrypoint"),
		TAPTAPREF: Worker.entrypoint<TapTapEntrypoint>(
			taptapRef,
			"TapTapEntrypoint",
		),
		SELF: Worker.entrypoint<PatPatEntrypoint>(Self, "PatPatEntrypoint"),
	},
});

await app.finalize();

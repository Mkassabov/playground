import alchemy from "alchemy";
import { Worker, Queue } from "alchemy/cloudflare";

export const app = await alchemy("alchemy-test", {
	telemetry: false,
});

const queueAName = `queue-a-${app.stage}`;
const queueA = await Queue(queueAName, {
	name: queueAName,
	adopt: true,
	delete: true,
});

const queueBName = `queue-b-${app.stage}`;
const queueB = await Queue(queueBName, {
	name: queueBName,
	adopt: true,
	delete: true,
});

export const patpat = await Worker("patpat", {
	entrypoint: "./deployments/alchemy-worker/src/patpat.ts",
	url: true,
	bindings: {
		QUEUE_A: queueA,
		QUEUE_B: queueB,
	},
	eventSources: [
		{
			queue: queueA,
			settings: { batchSize: 10, maxWaitTimeMs: 60 * 1000 },
			adopt: true,
			delete: true,
		},
		{
			queue: queueB,
			settings: { batchSize: 10, maxWaitTimeMs: 60 * 1000 },
			adopt: true,
			delete: true,
		},
	],
});

await app.finalize();

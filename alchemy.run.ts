import alchemy from "alchemy";
import { Worker, Queue, WranglerJson } from "alchemy/cloudflare";

const REMOTE = false;

export const app = await alchemy("alchemy-test-queue-bug", {
	stage: "dev",
	// phase: process.argv.includes("--destroy") ? "destroy" : "up",
	password: process.env.ALCHEMY_PASSWORD,
	telemetry: false,
});

// Create a queue for processing tasks
export const taskQueue = await Queue<{
	taskId: string;
	data: unknown;
}>("task-queue", {
	dev: {
		remote: REMOTE,
	},
});
export const bothQueue = await Queue<{
	taskId: string;
	data: unknown;
}>("both-queue", {
	dev: {
		remote: REMOTE,
	},
});

export const producer = await Worker("producer", {
	entrypoint: "./deployments/alchemy-worker/src/producer.ts",
	bindings: {
		TASK_QUEUE: taskQueue,
	},
	dev: {
		remote: REMOTE,
	},
});

export const consumer = await Worker("consumer", {
	entrypoint: "./deployments/alchemy-worker/src/consumer.ts",
	eventSources: [taskQueue],
	dev: {
		remote: REMOTE,
	},
});

export const both = await Worker("both", {
	entrypoint: "./deployments/alchemy-worker/src/both.ts",
	bindings: {
		TASK_QUEUE: bothQueue,
	},
	eventSources: [bothQueue],
	dev: {
		remote: REMOTE,
	},
});

export const neither = await Worker("neither", {
	entrypoint: "./deployments/alchemy-worker/src/neither.ts",
	dev: {
		remote: REMOTE,
	},
});

await WranglerJson({
	worker: both,
	name: "both.json",
});
await WranglerJson({
	worker: neither,
	name: "neither.json",
});
await WranglerJson({
	worker: producer,
	name: "producer.json",
});
await WranglerJson({
	worker: consumer,
	name: "consumer.json",
});

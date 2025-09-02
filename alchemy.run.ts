import alchemy from "alchemy";
import { Worker, Queue, WranglerJson } from "alchemy/cloudflare";

export const app = await alchemy("alchemy-test-queue-bug", {
	stage: "dev",
	phase: process.argv.includes("--destroy") ? "destroy" : "up",
	password: process.env.ALCHEMY_PASSWORD,
	telemetry: false,
});

// Create a queue for processing tasks
export const taskQueue = await Queue<{
	taskId: string;
	data: unknown;
}>("task-queue", {
	dev: {},
});

export const producer = await Worker("producer", {
	entrypoint: "./deployments/alchemy-worker/src/producer.ts",
	bindings: {
		TASK_QUEUE: taskQueue,
	},
});

export const consumer = await Worker("consumer", {
	entrypoint: "./deployments/alchemy-worker/src/consumer.ts",
	bindings: {
		TASK_QUEUE: taskQueue,
	},
	eventSources: [taskQueue],
});

const wranglerJson = await WranglerJson({
	worker: producer,
});

console.log(wranglerJson);

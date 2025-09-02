import alchemy from "alchemy";
import { Worker, Queue } from "alchemy/cloudflare";

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
	bindings: {
		TASK_QUEUE: taskQueue,
	},
	eventSources: [taskQueue],
	dev: {
		remote: REMOTE,
	},
});

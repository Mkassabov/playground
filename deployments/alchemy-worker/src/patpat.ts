import { DurableObject } from "cloudflare:workers";
import type { worker } from "../../../alchemy.run";
import type { DurableObjectNamespace } from "@cloudflare/workers-types";

type WorkerEnv = typeof worker.Env;

type Test<T> = {
	readonly [K in keyof T]: T[K] extends DurableObjectNamespace<infer A>
		? A
		: "B";
};

type Debug = Test<WorkerEnv>["COUNTER"];
//   ^?

export class Counter extends DurableObject {
	async getCounterValue() {
		const value = (await this.ctx.storage.get("value")) || 0;
		return value;
	}

	async increment(amount = 1) {
		let value: number = (await this.ctx.storage.get("value")) || 0;
		value += amount;
		// You do not have to worry about a concurrent request having modified the value in storage.
		// "input gates" will automatically protect against unwanted concurrency.
		// Read-modify-write is safe.
		await this.ctx.storage.put("value", value);
		return value;
	}

	async decrement(amount = 1) {
		let value: number = (await this.ctx.storage.get("value")) || 0;
		value -= amount;
		await this.ctx.storage.put("value", value);
		return value;
	}
}

export default {
	// biome-ignore lint/suspicious/useAwait: <explanation>
	async fetch(_request: Request): Promise<Response> {
		console.log("hai - patpat");
		return new Response("Hello patpat");
	},
};

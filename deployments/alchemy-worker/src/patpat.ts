import { id as nanoid } from "../../../utils/nanoid";
import type { patpat } from "../../../alchemy.run";

export default {
	// biome-ignore lint/suspicious/useAwait: its fine
	async fetch(): Promise<Response> {
		const id = nanoid();
		const message = `Haiii - patpat! ${id}`;
		console.log(message);
		return new Response(message);
	},

	// biome-ignore lint/suspicious/useAwait: its fine
	async queue(
		batch: MessageBatch,
		_env: typeof patpat.Env,
		_ctx: ExecutionContext,
	): Promise<void> {
		for (const message of batch.messages) {
			console.log("Received", message);
		}
	},
};

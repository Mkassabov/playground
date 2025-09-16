import { id as nanoid } from "../../../utils/nanoid";
import type { patpat } from "../../../alchemy.run";

export default {
	// biome-ignore lint/suspicious/useAwait: its fine
	async fetch(_request: Request, env: typeof patpat.Env): Promise<Response> {
		const id = nanoid();
		console.log(await env.TAPTAP.tap());
		console.log(await env.TAPTAPREF.tap());
		console.log(await env.SELF.pat());
		const message = `Haiii - patpat! ${id}`;
		console.log(message);
		return new Response(message);
	},
};

import { WorkerEntrypoint } from "cloudflare:workers";

export class PatPatEntrypoint extends WorkerEntrypoint {
	// biome-ignore lint/suspicious/useAwait: its fine
	async pat() {
		const message = "PAT PAT PAT: you got patted!";
		return message;
	}
}

import { id as nanoid } from "../../../utils/nanoid";

export default {
	// biome-ignore lint/suspicious/useAwait: its fine
	async fetch(): Promise<Response> {
		const id = nanoid();
		const message = `Haiii - taptap! ${id}`;
		console.log(message);
		return new Response(message);
	},
};

import { WorkerEntrypoint } from "cloudflare:workers";

export class TapTapEntrypoint extends WorkerEntrypoint {
	// biome-ignore lint/suspicious/useAwait: its fine
	async tap() {
		const message = "TAP TAP TAP: you got tapped!";
		return message;
	}
}

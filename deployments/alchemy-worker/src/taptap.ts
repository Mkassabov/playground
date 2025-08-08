import type { taptap } from "../../../alchemy.run";

export default {
	// biome-ignore lint/suspicious/useAwait: its fine
	async fetch(_request: Request, _env: typeof taptap.Env): Promise<Response> {
		return new Response("Haiii - taptap!");
	},
};

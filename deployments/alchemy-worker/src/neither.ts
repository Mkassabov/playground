import type { neither } from "../../../alchemy.run";

export default {
	// biome-ignore lint/suspicious/useAwait: its fine
	async fetch(request: Request, _env: typeof neither.Env): Promise<Response> {
		const url = new URL(request.url);
		const message = url.searchParams.get("message");

		console.log("[NEITHER] Received request with message:", message);
		return new Response("Error adding message to queue", { status: 500 });
	},
};

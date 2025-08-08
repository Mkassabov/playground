export default {
	// biome-ignore lint/suspicious/useAwait: its fine
	async fetch(): Promise<Response> {
		return new Response("Haiii - patpat!");
	},
};

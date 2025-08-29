export default {
	// biome-ignore lint/suspicious/useAwait: its fine
	async fetch(): Promise<Response> {
		console.log("test");
		return new Response("Haiii - patpat!");
	},
};

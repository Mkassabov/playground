export default {
	// biome-ignore lint/suspicious/useAwait: <explanation>
	async fetch(_request: Request): Promise<Response> {
		console.log("hai - patpat");
		return new Response("Hello patpat");
	},
};

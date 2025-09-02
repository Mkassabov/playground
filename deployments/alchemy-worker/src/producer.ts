import type { producer } from "../../../alchemy.run";

export default {
	async fetch(request: Request, env: typeof producer.Env): Promise<Response> {
		const url = new URL(request.url);
		const message = url.searchParams.get("message");

		console.log("[PRODUCER] Received request with message:", message);

		if (!message) {
			console.log("[PRODUCER] No message provided in query params");
			return new Response("Error: message query parameter is required", {
				status: 400,
			});
		}

		try {
			const taskId = crypto.randomUUID();

			console.log("[PRODUCER] Adding message to queue with taskId:", taskId);

			await env.TASK_QUEUE.send({
				taskId,
				data: message,
			});

			console.log("[PRODUCER] Successfully added message to queue");

			return new Response(
				JSON.stringify({
					success: true,
					taskId,
					message: "Message added to queue",
				}),
				{
					headers: { "Content-Type": "application/json" },
				},
			);
		} catch (error) {
			console.error("[PRODUCER] Error adding message to queue:", error);
			return new Response("Error adding message to queue", { status: 500 });
		}
	},
};

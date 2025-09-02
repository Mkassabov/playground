import type { consumer } from "../../../alchemy.run";

export default {
	async fetch(request: Request, env: typeof consumer.Env): Promise<Response> {
		console.log("[CONSUMER] HTTP endpoint called");
		return new Response("Consumer is running!");
	},

	async queue(
		batch: MessageBatch<{ taskId: string; data: unknown }>,
		env: typeof consumer.Env,
	): Promise<void> {
		console.log(
			"[CONSUMER] Processing batch with",
			batch.messages.length,
			"messages",
		);

		for (const message of batch.messages) {
			try {
				console.log("[CONSUMER] Processing message:", {
					taskId: message.body.taskId,
					data: message.body.data,
					timestamp: new Date().toISOString(),
				});

				console.log("[CONSUMER] Message data:", message.body.data);

				message.ack();
				console.log("[CONSUMER] Message acknowledged successfully");
			} catch (error) {
				console.error("[CONSUMER] Error processing message:", error);
				message.retry();
			}
		}
	},
};

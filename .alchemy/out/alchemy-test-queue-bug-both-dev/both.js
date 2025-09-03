// deployments/alchemy-worker/src/both.ts
var both_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const message = url.searchParams.get("message");
    console.log("[BOTH] Received request with message:", message);
    if (!message) {
      console.log("[BOTH] No message provided in query params");
      return new Response("Error: message query parameter is required", {
        status: 400
      });
    }
    try {
      const taskId = crypto.randomUUID();
      console.log("[BOTH] Adding message to queue with taskId:", taskId);
      await env.TASK_QUEUE.send({
        taskId,
        data: message
      });
      console.log("[BOTH] Successfully added message to queue");
      return new Response(
        JSON.stringify({
          success: true,
          taskId,
          message: "Message added to queue"
        }),
        {
          headers: { "Content-Type": "application/json" }
        }
      );
    } catch (error) {
      console.error("[BOTH] Error adding message to queue:", error);
      return new Response("Error adding message to queue", { status: 500 });
    }
  },
  // biome-ignore lint/suspicious/useAwait: its fine
  async queue(batch, _env) {
    console.log(
      "[BOTH] Processing batch with",
      batch.messages.length,
      "messages"
    );
    for (const message of batch.messages) {
      try {
        console.log("[BOTH] Processing message:", {
          taskId: message.body.taskId,
          data: message.body.data,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        console.log("[BOTH] Message data:", message.body.data);
        message.ack();
        console.log("[BOTH] Message acknowledged successfully");
      } catch (error) {
        console.error("[BOTH] Error processing message:", error);
        message.retry();
      }
    }
  }
};
export {
  both_default as default
};
//# sourceMappingURL=both.js.map

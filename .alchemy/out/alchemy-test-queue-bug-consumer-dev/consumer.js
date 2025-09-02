// deployments/alchemy-worker/src/consumer.ts
var consumer_default = {
  // biome-ignore lint/suspicious/useAwait: its fine
  async queue(batch, _env) {
    console.log(
      "[CONSUMER] Processing batch with",
      batch.messages.length,
      "messages"
    );
    for (const message of batch.messages) {
      try {
        console.log("[CONSUMER] Processing message:", {
          taskId: message.body.taskId,
          data: message.body.data,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        console.log("[CONSUMER] Message data:", message.body.data);
        message.ack();
        console.log("[CONSUMER] Message acknowledged successfully");
      } catch (error) {
        console.error("[CONSUMER] Error processing message:", error);
        message.retry();
      }
    }
  }
};
export {
  consumer_default as default
};
//# sourceMappingURL=consumer.js.map

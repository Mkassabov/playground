import type { ingestWorker } from "../alchemy.run";
import { createClient } from "@clickhouse/client-web";

export default {
	async fetch(req: Request, env: typeof ingestWorker.Env): Promise<Response> {
		const clickhouseClient = createClient({
			url: env.CLICKHOUSE_URL,
			password: env.CLICKHOUSE_PASSWORD,
		});

		const body = (await req.json()) as any;
		console.log(body);
		body.timestamp = Date.now();

		const table = `${body.event.split(".")[0]}_telemetry`;

		await clickhouseClient.insert({
			table,
			values: [body],
			format: "JSONEachRow",
		});
		return new Response();
	},
};

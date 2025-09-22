import { id as nanoid } from "../../../utils/nanoid";
import type { patpat } from "../../../alchemy.run";
import { createClient } from "@clickhouse/client-web";

export default {
	async fetch(req: Request, env: typeof patpat.Env): Promise<Response> {
		const url = new URL(req.url);
		const clickhouseClient = createClient({
			url: env.CLICKHOUSE_URL,
			password: env.CLICKHOUSE_PASSWORD,
		});

		if (url.pathname === "/read") {
			// Read all logged ids from ClickHouse
			const query = "SELECT id, time FROM patpat_log";
			const result = await clickhouseClient.query({
				query,
				format: "JSONEachRow",
			});
			const rows = await result.json();
			return new Response(JSON.stringify(rows), {
				headers: { "Content-Type": "application/json" },
			});
		} else if (url.pathname === "/") {
			// Log the id to ClickHouse
			const id = nanoid();
			await clickhouseClient.insert({
				table: "patpat_log",
				values: [{ id, time: new Date().toISOString() }],
				format: "JSONEachRow",
			});
			return new Response(JSON.stringify({ success: true }), {
				headers: { "Content-Type": "application/json" },
			});
		} else {
			return new Response("Not found", { status: 404 });
		}
	},
};

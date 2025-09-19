import alchemy from "alchemy";

export const app = await alchemy("alchemy-test-clickhouse", {
	telemetry: false,
});

await app.finalize();

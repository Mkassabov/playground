import alchemy from "alchemy";
import { Service, getOrganizationByName } from "alchemy/clickhouse";
import { Worker } from "alchemy/cloudflare";
import { Exec } from "alchemy/os";
import { join } from "pathe";
import { CloudflareStateStore } from "alchemy/state";

export const app = await alchemy("alchemy-telemetry", {
	stateStore: (scope) => new CloudflareStateStore(scope),
});

const organization = await getOrganizationByName(alchemy.env.CLICKHOUSE_ORG);

const clickhouse = await Service("clickhouse", {
	organization,
	provider: "aws",
	region: "us-east-1",
	minReplicaMemoryGb: 8,
	maxReplicaMemoryGb: 356,
	numReplicas: 3,
	enableMysqlEndpoint: true,
});

await Exec("migrations", {
	command: `bunx clickhouse-migrations migrate --db default --host https://${clickhouse.httpsEndpoint?.host}:${clickhouse.httpsEndpoint?.port} --user ${clickhouse.mysqlEndpoint?.username} --password ${clickhouse.password.unencrypted} --migrations-home ${join(import.meta.dirname, "migrations")}`,
});

export const ingestWorker = await Worker("ingest-worker", {
	adopt: true,
	entrypoint: "./deployments/telemetry.ts",
	bindings: {
		CLICKHOUSE_URL: `https://${clickhouse.httpsEndpoint?.host}:${clickhouse.httpsEndpoint?.port}`,
		CLICKHOUSE_PASSWORD: clickhouse.password,
	},
	domains: ["telemetry.alchemy.run"],
});

console.log(ingestWorker.url);

await app.finalize();

// await app.finalize();

// console.log(apiKey);

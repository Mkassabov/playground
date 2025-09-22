import alchemy from "alchemy";
import { Service, getOrganizationByName } from "alchemy/clickhouse";
import { Worker } from "alchemy/cloudflare";

export const app = await alchemy("alchemy-test-clickhouse", {
	telemetry: false,
});

const organization = await getOrganizationByName("MK's Organization");

console.log(organization);

const service = await Service("clickhouse", {
	organization,
	provider: "aws",
	region: "us-east-1",
	minReplicaMemoryGb: 8,
	maxReplicaMemoryGb: 356,
	numReplicas: 3,
});

console.log(service);

// biome-ignore lint/style/noNonNullAssertion: gross
const serviceEndpoint = service.endpoints.find(
	(endpoint) => endpoint.protocol === "https",
)!;

export const patpat = await Worker("patpat", {
	entrypoint: "./deployments/alchemy-worker/src/patpat.ts",
	bindings: {
		CLICKHOUSE_URL: `https://${serviceEndpoint.host}:${serviceEndpoint.port}`,
		CLICKHOUSE_PASSWORD: service.password,
	},
});

await app.finalize();

// await app.finalize();

// console.log(apiKey);

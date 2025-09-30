import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { secret, type Secret } from "../secret.ts";
import { diff } from "../util/diff.ts";
import {
	createClickhouseApi,
	type Service as ApiService,
	type Organization,
} from "./api.ts";

export interface ServiceProps {
	secret?: string | Secret<string>;
	organization: Organization;
	provider: ApiService["provider"];
	region: ApiService["region"];
	minReplicaMemoryGb?: ApiService["minReplicaMemoryGb"];
	maxReplicaMemoryGb?: ApiService["maxReplicaMemoryGb"];
	numReplicas?: ApiService["numReplicas"];
}

export interface Service {
	organizationId: string;
	name: string;
	clickhouseId: string;
	password: Secret<string>;
	provider: ApiService["provider"];
	region: ApiService["region"];
	ipAccessList: ApiService["ipAccessList"];
	minReplicaMemoryGb: ApiService["minReplicaMemoryGb"];
	maxReplicaMemoryGb: ApiService["maxReplicaMemoryGb"];
	numReplicas: ApiService["numReplicas"];
	idleScaling: ApiService["idleScaling"];
	idleTimeoutMinutes: ApiService["idleTimeoutMinutes"];
	isReadonly: ApiService["isReadonly"];
	dataWarehouseId: ApiService["dataWarehouseId"];
	encryptionKey?: ApiService["encryptionKey"];
	encryptionAssumedRoleIdentifier?: ApiService["encryptionAssumedRoleIdentifier"];
	releaseChannel: ApiService["releaseChannel"];
	byocId?: ApiService["byocId"];
	hasTransparentDataEncryption: ApiService["hasTransparentDataEncryption"];
	profile: ApiService["profile"];
	complianceType?: ApiService["complianceType"];
	backupId?: string;
	enableMysqlEndpoint?: boolean;
	enableHttpsEndpoint?: true;
	enableNativesecureEndpoint?: true;
	mysqlEndpoint?: {
		protocol: "mysql";
		host: string;
		port: number;
		username: string;
	};
	httpsEndpoint?: {
		protocol: "https";
		host: string;
		port: number;
	};
	nativesecureEndpoint?: {
		protocol: "nativesecure";
		host: string;
		port: number;
	};
	stateTarget: "start" | "stop";
	state: ApiService["state"];
}

export const Service = Resource(
	"clickhouse::Service",
	async function (
		this: Context<Service>,
		id: string,
		props: ServiceProps,
	): Promise<Service> {
		const api = createClickhouseApi();

		const minReplicaMemoryGb = props.minReplicaMemoryGb ?? 8;
		const maxReplicaMemoryGb = props.maxReplicaMemoryGb ?? 356;
		const numReplicas = props.numReplicas ?? 3;

		const name = this.scope.createPhysicalName(id);

		if (this.phase === "delete") {
			await api.v1
				.organizations(props.organization.id)
				.services(this.output.clickhouseId)
				.delete();

			return this.destroy();
		}
		if (this.phase === "update") {
			if (
				diff(props, this.output).some(
					(prop) =>
						prop !== "minReplicaMemoryGb" &&
						prop !== "maxReplicaMemoryGb" &&
						prop !== "numReplicas",
				)
			) {
				return this.replace();
			} else {
				const response = await api.v1
					.organizations(props.organization.id)
					.services(this.output.clickhouseId)
					.replicaScaling.patch({
						minReplicaMemoryGb: props.minReplicaMemoryGb,
						maxReplicaMemoryGb: props.maxReplicaMemoryGb,
						numReplicas: props.numReplicas,
					});

				updates.minReplicaMemoryGb = response.minReplicaMemoryGb;
				updates.maxReplicaMemoryGb = response.maxReplicaMemoryGb;
				updates.numReplicas = response.numReplicas;
			}

			return {
				...this.output,
				...updates,
			};
		}

		const service = await api.v1
			.organizations(props.organization.id)
			.services.post({
				name,
				provider: props.provider,
				region: props.region,
				minReplicaMemoryGb: minReplicaMemoryGb,
				maxReplicaMemoryGb: maxReplicaMemoryGb,
				numReplicas: numReplicas,
			});

		return {
			password: secret(service.password),
			mysqlEndpoint: service.service.endpoints.find(
				(endpoint) => endpoint.protocol === "mysql",
			),
			httpsEndpoint: service.service.endpoints.find(
				(endpoint) => endpoint.protocol === "https",
			),
		};
	},
);

async function waitForServiceState(
	api: any,
	organizationId: string,
	serviceId: string,
	stateChecker: (state: string) => boolean,
	maxWaitSeconds: number,
) {
	const checkState = async (): Promise<void> => {
		const service = await api.v1
			.organizations(organizationId)
			.services(serviceId)
			.get();

		if (stateChecker(service.state)) {
			return;
		}

		throw new Error(`Service ${serviceId} is in state ${service.state}`);
	};

	if (maxWaitSeconds < 5) {
		maxWaitSeconds = 5;
	}

	const maxRetries = Math.floor(maxWaitSeconds / 5);

	for (let attempt = 0; attempt < maxRetries; attempt++) {
		try {
			await checkState();
			return;
		} catch (error) {
			if (attempt === maxRetries - 1) {
				throw error;
			}
			await new Promise((resolve) => setTimeout(resolve, 5000));
		}
	}
}

import alchemy from "alchemy";
import { Container, Worker, WranglerJson } from "alchemy/cloudflare";
import { CloudflareStateStore, FileSystemStateStore } from "alchemy/state";
import type { EvalContainer } from "./deployments/container";

const appName = "eval";

const app = await alchemy(appName, {
  password: process.env.ALCHEMY_PASSWORD,
  // https://alchemy.run/guides/cloudflare-state-store
  stateStore: (scope) =>
    scope.local
      ? new FileSystemStateStore(scope)
      : new CloudflareStateStore(scope, {
          scriptName: `${appName}-state-${scope.stage}`,
        }),
});

const container = await Container<EvalContainer>("container", {
  className: "EvalContainer",
  // tag: "0.1.0",
  build: {
    dockerfile: "Dockerfile",
    args: {
      IMAGE_VERSION: "1.24-alpine",
    },
  },
  instanceType: "basic",
  // maxInstances: 10,
  observability: {
    logs: { enabled: true },
  },
});

export const worker = await Worker("worker", {
  entrypoint: "deployments/worker.ts",
  bindings: {
    MY_CONTAINER: container,
  },
  url: app.local === true,
  dev: {
    port: 1339, // etl worker runs on port 1338
  },
});

await WranglerJson({
  worker: worker,
});

console.log(worker.url);

await app.finalize();

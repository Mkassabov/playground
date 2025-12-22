import alchemy from "alchemy";
import {
  Worker,
  DnsRecords,
  Ruleset,
  Route,
  HyperdriveRef,
} from "alchemy/cloudflare";
import { SQLiteStateStore } from "alchemy/state";

const mode = "remote" as "remote" | "local";

const app = await alchemy("instant-destroy", {
  stateStore: (scope) => new SQLiteStateStore(scope),
});

// Site configuration type
interface SiteConfig {
  zoneId: string;
  domain: string;
  subdomains: Array<{
    name: string;
    type: "A" | "CNAME";
    content?: string;
  }>;
  wwwRedirect?: boolean;
  workerRoutes?: Array<{
    pattern: string;
    worker: "server" | "content";
  }>;
}

// Configure all sites
const sites: SiteConfig[] = [
  {
    zoneId: "98046837bf56dd22a505ac63d1fcd325",
    domain: "alchemy-test-2.us",
    subdomains: [
      { name: "www", type: "CNAME" },
      { name: "tr", type: "CNAME" },
    ],
    wwwRedirect: true,
    workerRoutes: [{ pattern: "*.alchemy-test-2.us/*", worker: "server" }],
  },
  {
    zoneId: "98046837bf56dd22a505ac63d1fcd325",
    domain: "alchemy-test-2.us",
    subdomains: [{ name: "www", type: "CNAME" }],
    wwwRedirect: true,
    workerRoutes: [{ pattern: "*.alchemy-test-2.us/*", worker: "content" }],
  },
  // Add more sites here...
];

type Workers = {
  server: typeof Worker.prototype;
  content: typeof Worker.prototype;
};

async function configureSite(config: SiteConfig, workers: Workers) {
  const { domain, subdomains, wwwRedirect = true, workerRoutes = [] } = config;

  // DNS Records
  const dns = await DnsRecords(`${domain}-dns`, {
    zoneId: config.zoneId,
    records: [
      { name: domain, type: "A", content: "192.0.2.1", proxied: true },
      ...subdomains.map((sub) => ({
        name: `${sub.name}.${domain}`,
        type: sub.type,
        content: domain,
        proxied: true,
      })),
    ],
  });

  // List of phase: https://developers.cloudflare.com/ruleset-engine/reference/phases-list/
  // WWW Redirect (non-www → www)
  let redirect;
  if (wwwRedirect) {
    redirect = await Ruleset(`${domain}-www-redirect`, {
      zone: domain,
      phase: "http_request_dynamic_redirect",
      rules: [
        {
          description: "Redirect non-www to www",
          expression: `(http.host eq "${domain}")`,
          action: "redirect",
          action_parameters: {
            from_value: {
              status_code: 301,
              target_url: {
                expression: `concat("https://www.${domain}", http.request.uri.path)`,
              },
            },
          },
        },
      ],
    });
  }

  // Worker Routes
  const routes = [];
  for (const route of workerRoutes) {
    const r = await Route(`${domain}-route-${route.pattern}`, {
      pattern: route.pattern,
      script: workers[route.worker],
      adopt: true,
    });
    routes.push(r);
  }

  return { dns, redirect, routes };
}

const db = await HyperdriveRef({
  name: "undoc",
  dev: {
    origin:
      mode === "local"
        ? (process.env.DATABASE_URL_LOCAL ?? "")
        : (process.env.DATABASE_URL_REMOTE ?? ""),
  },
});

export const server = await Worker("server", {
  entrypoint: "src/workers/base.ts",
  compatibility: "node",
  url: true,
  // domains: [site], // Add your domain here
  bindings: {
    DB: db,
    CONTENT_WORKER_URL:
      process.env.CONTENT_WORKER_URL || "http://localhost:3002",
  },
  dev: {
    remote: mode === "remote",
    port: 3000,
  },
  name: "aaa",
  adopt: true,
  observability: {
    enabled: true,
    headSamplingRate: 1,
    traces: {
      enabled: true,
      destinations: ["axiom-traces"],
      persist: true,
      headSamplingRate: 1, // 100%
    },
    // logs: {
    // 	enabled: true,
    // 	destinations: ["axiom-traces"],
    // 	persist: true,
    // 	headSamplingRate: 1, // 100%
    // },
  },
});

export const api = await Worker("api", {
  entrypoint: "src/workers/api.ts",
  compatibility: "node",
  bindings: {
    CORS_ORIGIN: process.env.CORS_ORIGIN || "",
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || "",
    DB: db,
  },
  dev: {
    port: 3001,
  },
  name: "aaa-api",
  adopt: true,
});

export const google_cron_job = await Worker("googlebot-cron", {
  name: "aaa-googlebot-cron",
  entrypoint: "src/cron/google-ips-cron.ts",
  compatibility: "node",
  bindings: {
    DB: db,
  },
  dev: {
    remote: mode === "remote",
    port: 3003,
  },
  crons: ["*/5 * * * *"], // Every 5 minutes
  url: false,
  adopt: true,
});

export const content = await Worker("content", {
  entrypoint: "src/workers/content.ts",
  compatibility: "node",
  url: true,
  bindings: {
    DB: db,
  },
  dev: {
    remote: mode === "remote",
    port: 3002,
  },
  name: "aaa-content",
  adopt: true,
});

// Configure DNS, redirects, and routes for all sites
for (const site of sites) {
  await configureSite(site, { server, content });
}

console.log(`Server -> ${server.url}`);
console.log(`API -> ${api.url}`);
console.log(`Content -> ${content.url}`);

await app.finalize();

import { getContainer } from "@cloudflare/containers";
import { zValidator as validator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import z from "zod";
import type { worker } from "../alchemy.run.ts";

// the class must be exported for Cloudflare
export { EvalContainer } from "./container.ts";

type Bindings = typeof worker.bindings;

const app = new Hono<{
  Bindings: Bindings;
}>();

app.use(logger());

// app.get("/health", async (c) => c.text("OK"));

app.get("/health", async (c) => {
  // const data = c.req.valid("json");
  try {
    console.log("container", JSON.stringify(c.env.MY_CONTAINER, null, 2));
    const container = getContainer(c.env.MY_CONTAINER as any, "container");
    const resp = await container.containerFetch("http://container/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      const msg = await resp.text();
      throw new Error(msg);
    } else {
      const res = await resp.json();
      c.json(res);
    }
  } catch (err) {
    console.error(err);
    throw new HTTPException(500, { message: "Internal Server Error", cause: err });
  }
});

const evalFieldGraphSchema = z.object({});

app.post("/", validator("json", evalFieldGraphSchema), async (c) => {
  // const data = c.req.valid("json");
  try {
    const container = getContainer(c.env.MY_CONTAINER as any, "container");
    const resp = await container.containerFetch("http://container/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      const msg = await resp.text();
      throw new Error(msg);
    } else {
      const res = await resp.json();
      c.json(res);
    }
  } catch (err) {
    console.error(err);
    throw new HTTPException(500, { message: "Internal Server Error", cause: err });
  }
});

export default {
  async fetch(request: Request, env: typeof worker.Env): Promise<Response> {
    const container = getContainer(env.MY_CONTAINER, "container");
    const url = new URL(request.url);
    const resp = await container.containerFetch(`http://container${url.pathname}`, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    return resp;
  },
} satisfies ExportedHandler<typeof worker.Env>;

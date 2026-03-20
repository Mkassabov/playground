import { Container } from "@cloudflare/containers";
import type { worker } from "../alchemy.run.ts";

export class EvalContainer extends Container<typeof worker.Env> {
  override defaultPort = 8080;
  override sleepAfter = "30m";
}

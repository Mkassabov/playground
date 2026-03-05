import alchemy from "alchemy";
import { Tunnel } from "alchemy/cloudflare";

export const app = await alchemy("test-app", {
  password: "test",
});

await app.finalize();

import alchemy from "alchemy";
// import { Worker } from "alchemy/cloudflare";
import { File } from "alchemy/fs";

export const app = await alchemy("alchemy-test", {
	stage: "dev",
	phase: process.argv.includes("--destroy") ? "destroy" : "up",
	password: process.env.ALCHEMY_PASSWORD,
	// telemetry: false,
});

await File("my-file", {
	path: "./test.txt",
	content: "Hello, world!",
});

await app.finalize();

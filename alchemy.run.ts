import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

export const app = await alchemy("alchemy-test", {
	stage: "dev",
	phase: process.argv.includes("--destroy") ? "destroy" : "up",
	password: process.env.ALCHEMY_PASSWORD,
	telemetry: false,
});

console.log("Alchemy Start");
console.log("Alchemy Start");
console.log("Alchemy Start");
console.log("Alchemy Start");
console.log("Alchemy Start");

export const patpat = await Worker("patpat", {
	entrypoint: "./deployments/alchemy-worker/src/patpat.ts",
});

console.log("Patpat");

export const taptap = await Worker("taptap", {
	entrypoint: "./deployments/alchemy-worker/src/taptap.ts",
});

console.log("Taptap");

while (true) {
	console.log("BK Check");
	console.log("PRE");
	console.log("breakpoint?");
	console.log("POST");
	await new Promise((resolve) => setTimeout(resolve, 1000));
}

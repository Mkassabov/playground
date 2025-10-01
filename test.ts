import envPaths from "env-paths";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import { join } from "node:path";
import path from "pathe";

export const CONFIG_DIR = path.join(os.homedir(), ".alchemy");
export const CONFIG_DIR_LEGACY = envPaths("alchemy", { suffix: "" }).config;

async function getOrCreateUserId() {
	const path = join(CONFIG_DIR, "id");

	try {
		return (await readFile(path, "utf-8")).trim();
	} catch {}

	const legacyPath = join(CONFIG_DIR_LEGACY, "id");

	try {
		const id = (await readFile(legacyPath, "utf-8")).trim();
		await mkdir(CONFIG_DIR_LEGACY, { recursive: true });
		await writeFile(path, id);
	} catch {}

	try {
		await mkdir(CONFIG_DIR, { recursive: true });
	} catch {}

	const id = crypto.randomUUID();
	try {
		await writeFile(path, id);
		console.warn(
			[
				"Attention: To help improve Alchemy, we now collect anonymous usage, performance, and error data.",
				"You can opt out by setting the ALCHEMY_TELEMETRY_DISABLED or DO_NOT_TRACK environment variable to a truthy value.",
			].join("\n"),
		);
	} catch {
		return null;
	}

	return id;
}

console.log(await getOrCreateUserId());

import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	minify: false,
	target: "es2022",
	format: ["cjs", "esm"],
	clean: true,
	dts: true,
	tsconfig: "./tsconfig.build.json",
	sourcemap: true,
});

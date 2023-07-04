import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
import { readFileSync } from "fs";

const pkg = JSON.parse(
	readFileSync(new URL("./package.json", import.meta.url), "utf8")
);

const formatName = "FlyToApp";

export default {
	input: "./src/index.ts",
	output: [
		{
			file: pkg.main,
			format: "cjs",
		},
		{
			file: pkg.module,
			format: "es",
		},
		{
			file: pkg.browser,
			format: "umd",
			name: formatName,
		},
	],
	plugins: [
		json(),
		commonjs({
			include: /node_modules/,
		}),
		resolve({
			preferBuiltins: true,
			jsnext: true,
			main: true,
			brower: true,
		}),
		// 设置全局路径别名
		alias({
			entries: {
				src: resolve("src"),
			},
		}),
		typescript(),
		babel({ exclude: "node_modules/**" }),
	],
};

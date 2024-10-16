
import { readFileSync } from 'node:fs';

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const pkg = JSON.parse(readFileSync('./package.json'));

export default [
  {
    input: "./src/index.ts",
    output: {
      file:  pkg.module,
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json"}),
      postcss(),
    ],
  },
  {
    input: "./dist/esm/index.d.ts",
    output: [{ file: "./dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];


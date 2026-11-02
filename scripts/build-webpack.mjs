import { spawn } from "node:child_process";
import { createRequire } from "node:module";

/**
 * SiteGround's native Next SWC binary panics in stacker before it can read
 * next.config.ts. NEXT_TEST_WASM is an internal, unstable Next.js 16.4.2
 * switch. The loader logs that it "will be ignored" on supported platforms,
 * but loadBindings() still tries @next/swc-wasm-nodejs first.
 * WASM bindings cannot run Turbopack, so production builds pass --webpack.
 * The same switch is required for `next start`, which also loads next.config.ts.
 */
process.env.NEXT_TEST_WASM = "1";

const require = createRequire(import.meta.url);
const { loadBindings } = require("next/dist/build/swc");
const bindings = await loadBindings();

if (!bindings.isWasm) {
  console.error(
    "SWC WASM bindings were not loaded. The native binary is not usable on SiteGround, so this command stops.",
  );
  process.exit(1);
}

const nextArgs = process.argv.slice(2);
if (nextArgs.length === 0) {
  console.error("Pass the Next.js command, for example: build --webpack");
  process.exit(1);
}

const nextBin = require.resolve("next/dist/bin/next");
const child = spawn(process.execPath, [nextBin, ...nextArgs], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});

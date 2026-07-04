import { defineConfig } from "tsdown"

/**
 * tsdown — https://tsdown.dev
 *
 * This app builds with Vite for the Cloudflare Worker target. tsdown is wired
 * up here for any future internal library packages (e.g. extracted UI kit,
 * MCP helpers, shared utils). Add entries below when you have something to
 * publish or share across packages.
 */
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2022",
  outDir: "dist",
  external: ["react", "react-dom", "react/jsx-runtime"],
})

import { defineConfig } from "vite"

import { tanstackStart } from "@tanstack/react-start/plugin/vite"

import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { cloudflare } from "@cloudflare/vite-plugin"
import tsconfigPaths from "vite-tsconfig-paths"

const config = defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    tsconfigPaths(),
    tanstackStart({ server: { entry: "server" } }),
    viteReact()
  ]
})

export default config

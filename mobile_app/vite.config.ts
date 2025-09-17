import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url"; // <-- ADD THIS IMPORT
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// --- START OF FIX ---
// Manually define __filename and __dirname, since import.meta.url is not working
// in your 'tsx' environment.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- END OF FIX ---

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      // Replace all instances of 'import.meta.dirname' with your new '__dirname' variable
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"), // <-- FIX HERE AS WELL
  build: {
    outDir: path.resolve(__dirname, "dist/public"), // <-- AND FIX HERE
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

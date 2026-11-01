import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Frontend runs on port 3000 (the port the Express CORS setting allows).
// JSX is allowed inside .js files so the file names stay App.js, TodoApp.js ...
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  server: { port: 3000 },
  esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
});

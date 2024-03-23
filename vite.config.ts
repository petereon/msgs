import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const monacoPrefix = `monaco-editor/esm/vs`;

const monacoChunks = {
  jsonWorker: [`${monacoPrefix}/language/json/json.worker`],
  cssWorker: [`${monacoPrefix}/language/css/css.worker`],
  htmlWorker: [`${monacoPrefix}/language/html/html.worker`],
  tsWorker: [`${monacoPrefix}/language/typescript/ts.worker`],
  editorWorker: [`${monacoPrefix}/editor/editor.worker`],
}

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/sass/variables.scss";`
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          ...monacoChunks,
        },
      },
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));

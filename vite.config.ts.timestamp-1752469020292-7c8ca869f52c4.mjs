// vite.config.ts
import { defineConfig } from "file:///C:/Users/gourv/Downloads/Compressed/Gamingfrontend-main/Gamingfrontend-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/gourv/Downloads/Compressed/Gamingfrontend-main/Gamingfrontend-main/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      },
      input: {
        main: "./index.html"
      }
    }
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  resolve: {
    alias: {
      buffer: "buffer"
      // '@': path.resolve(__dirname, 'src'),
    }
  },
  optimizeDeps: {
    include: ["buffer"]
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnb3VydlxcXFxEb3dubG9hZHNcXFxcQ29tcHJlc3NlZFxcXFxHYW1pbmdmcm9udGVuZC1tYWluXFxcXEdhbWluZ2Zyb250ZW5kLW1haW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGdvdXJ2XFxcXERvd25sb2Fkc1xcXFxDb21wcmVzc2VkXFxcXEdhbWluZ2Zyb250ZW5kLW1haW5cXFxcR2FtaW5nZnJvbnRlbmQtbWFpblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZ291cnYvRG93bmxvYWRzL0NvbXByZXNzZWQvR2FtaW5nZnJvbnRlbmQtbWFpbi9HYW1pbmdmcm9udGVuZC1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgYnVmZmVyIH0gZnJvbSAnc3RyZWFtL2NvbnN1bWVycydcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5cclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlkXHJcbiAgICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAuc3BsaXQoXCJub2RlX21vZHVsZXMvXCIpWzFdXHJcbiAgICAgICAgICAgICAgLnNwbGl0KFwiL1wiKVswXVxyXG4gICAgICAgICAgICAgIC50b1N0cmluZygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGlucHV0OntcclxuICAgICAgICBtYWluOiAnLi9pbmRleC5odG1sJyxcclxuXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sIFxyXG4gIHNlcnZlcjp7XHJcbiAgICBwcm94eTp7XHJcbiAgICAgICcvYXBpJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCdcclxuICAgIH1cclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIGJ1ZmZlcjonYnVmZmVyJyxcclxuICAgICAgLy8gJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbJ2J1ZmZlciddLFxyXG4gIH0sXHJcbiAgXHJcbiAgXHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlhLFNBQVMsb0JBQW9CO0FBRTliLE9BQU8sV0FBVztBQUlsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixhQUFhLElBQUk7QUFDZixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IsbUJBQU8sR0FDSixTQUFTLEVBQ1QsTUFBTSxlQUFlLEVBQUUsQ0FBQyxFQUN4QixNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQ1osU0FBUztBQUFBLFVBQ2Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsT0FBTTtBQUFBLFFBQ0osTUFBTTtBQUFBLE1BRVI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBTztBQUFBLElBQ0wsT0FBTTtBQUFBLE1BQ0osUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFPO0FBQUE7QUFBQSxJQUVUO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLFFBQVE7QUFBQSxFQUNwQjtBQUFBLEVBR0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUNuQixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

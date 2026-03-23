import { defineConfig } from 'vite'
import { buffer } from 'stream/consumers'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
      input:{
        main: './index.html',

      },
    },
  }, 
  server:{
    proxy:{
      '/api': 'http://localhost:3000'
    }
  },
  resolve: {
    alias: {
      buffer:'buffer',
      // '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  
  
  plugins: [react()],
})

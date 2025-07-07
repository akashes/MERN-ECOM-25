import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),visualizer(
    {
      filename: 'dist/bundle-report.html', // 👈 Important!
      open: true, // 👈 Automatically open in browser after build
      gzipSize: true,
      brotliSize: true
    }
  )],
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:8000'
      }
    }
  },
   build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          utils:['axios','react-toastify'],
              mui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          muiIcons: ['@mui/icons-material'], 
        }
      }
    }
  }
})


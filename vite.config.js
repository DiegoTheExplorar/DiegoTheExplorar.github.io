import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true 
  },
  plugins: [react()],
  base: '/', // This is the correct value if your repo is not username.github.io
})

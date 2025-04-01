import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/DiegoTheExplorar.github.io', // This is the correct value if your repo is not username.github.io
})

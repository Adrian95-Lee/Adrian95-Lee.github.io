import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base: './'` keeps asset paths relative so the built site works on
// GitHub Pages, Netlify, Vercel or any static host / sub-folder.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})

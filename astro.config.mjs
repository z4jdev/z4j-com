// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://z4j.com',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
});

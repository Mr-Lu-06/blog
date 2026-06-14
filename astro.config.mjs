// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://blog.zi9407661.workers.dev/',

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },

  adapter: cloudflare()
});
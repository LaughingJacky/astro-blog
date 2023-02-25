/*
 * @Author: shawbowang
 * @Date: 2023-02-18 02:44:15
 * @LastEditTime: 2023-02-25 14:34:47
 * @LastEditors: shawbowang
 * @Description: 
 * @FilePath: /blog/astro.config.mjs
 */
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel/serverless';
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  integrations: [preact({compat: true})],
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: ['js'],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
    remarkPlugins: [remarkToc],
  },
  adapter: vercel(),
  output: 'server',
});

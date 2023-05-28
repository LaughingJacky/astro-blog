/*
 * @Author: shawbowang
 * @Date: 2023-02-18 02:44:15
 * @LastEditTime: 2023-02-25 15:39:34
 * @LastEditors: shawbowang
 * @Description: 
 * @FilePath: /blog/astro.config.mjs
 */
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact({ compat: true }),
    sitemap({
      i18n: {
        defaultLocale: 'zh-CN'
      },
      serialize(item) {
        if (/\/black-tech-weekly\//.test(item.url)) {
          item.changefreq = 'weekly';
          item.priority = 0.9;
          item.lastmod = new Date();
        }

        return item;
      }
    })
  ],
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
  output: 'static',
  site: 'https://shawbo.ltd'
});

/*
 * @Author: shawbowang
 * @Date: 2023-02-18 02:44:15
 * @LastEditTime: 2023-02-23 17:36:48
 * @LastEditors: shawbowang
 * @Description: 
 * @FilePath: /blog/astro.config.mjs
 */
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  integrations: [preact({compat: true})],
  adapter: vercel(),
  output: 'server',
});

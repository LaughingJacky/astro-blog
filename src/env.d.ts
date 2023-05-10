/*
 * @Author: shawbowang
 * @Date: 2023-02-18 02:44:15
 * @LastEditTime: 2023-02-23 15:55:39
 * @LastEditors: shawbowang
 * @Description: 
 * @FilePath: /blog/src/env.d.ts
 */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string;
  readonly HOST: string;
  readonly CONTENTFUL_SPACE_ID: string;
  readonly CONTENTFUL_DELIVERY_TOKEN: string;
  readonly CONTENTFUL_PREVIEW_TOKEN: string;
}

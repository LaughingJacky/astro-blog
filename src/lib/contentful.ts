/*
 * @Author: shawbowang
 * @Date: 2023-02-18 20:02:45
 * @LastEditTime: 2023-02-20 22:55:08
 * @LastEditors: shawbowang
 * @Description: 
 * @FilePath: /blog/src/lib/contentful.ts
 */
import contentful from 'contentful';

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  body: string;
  tags: string[];
  author: {
    fields: {
      name: string;
      title: string;
      company: string;
    };
  };
  heroImage: {
    fields: {
      title: string;
      file: {
        url: string;
      }
    }
  };
  publishDate: string;
}

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: 'cdn.contentful.com'
  // accessToken: import.meta.env.DEV ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  // host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com'
})
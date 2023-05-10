import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import strip from 'strip-markdown';
import remarkStringify from 'remark-stringify';

export const markdownRenderer = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify);

export const markdownTexter = unified().use(strip).use(remarkStringify)

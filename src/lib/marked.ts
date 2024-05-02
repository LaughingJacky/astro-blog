import { marked } from 'marked';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';

// import { getHighlighter } from 'shiki';

// 自定义shiki渲染器
// const highlighter = await getHighlighter({
//   themes: ['dracula'],
//   langs: ['typescript']
// });
// const renderer = {
// 	code: (code: string, language = '') => {
// 		console.log(code, language);
//     return highlighter.codeToHtml(code, {
// 			lang: 'typescript',
// 			theme: 'dracula',
// 		});
// 	}
// };

// 加载 Prism 支持的语言
loadLanguages(['typescript']);

// 自定义prisma渲染器
const renderer = {
  code: (code: string, language = '') => {
    // 确保语言是有效的，否则默认为 'markup'
    const validLanguage = Prism.languages[language] || Prism.languages.markup;
    // 使用 Prism 进行代码高亮
    const highlighted = Prism.highlight(code, validLanguage, language);
    // 返回高亮后的 HTML 字符串
    return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
  }
};

// 使用自定义渲染器
marked.use({ renderer });
export default marked;
export interface TocItem {
	depth: number;
	id: string;
	text: string;
}

const toSlug = (text: string) =>
	text
		.trim()
		.toLowerCase()
		.replace(/[\s\u3000]+/g, '-')
		.replace(/[^\p{L}\p{N}-]+/gu, '')
		.replace(/-{2,}/g, '-')
		.replace(/^-+|-+$/g, '');

/**
 * 给正文里的 h2~h4 注入锚点 id，并同时返回目录结构。
 * 注意：要在 DOMPurify.sanitize 之后再调用，否则 id 可能被清理掉。
 */
export function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
	const toc: TocItem[] = [];
	const used = new Map<string, number>();

	const output = html.replace(
		/<h([2-4])\b([^>]*)>([\s\S]*?)<\/h\1>/gi,
		(match, depth: string, attrs: string, inner: string) => {
			if (/\sid=/.test(attrs)) return match;

			const text = inner
				.replace(/<[^>]+>/g, '')
				.replace(/\s+/g, ' ')
				.trim();
			if (!text) return match;

			const base = toSlug(text) || `section-${toc.length + 1}`;
			const count = used.get(base) ?? 0;
			used.set(base, count + 1);
			const id = count === 0 ? base : `${base}-${count + 1}`;

			toc.push({ depth: Number(depth), id, text });
			return `<h${depth}${attrs} id="${id}">${inner}</h${depth}>`;
		}
	);

	return { html: output, toc };
}

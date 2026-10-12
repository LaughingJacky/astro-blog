import type { ComponentType } from 'preact';
import {
	ArrowUpRightIcon,
	BadgeCheckIcon,
	BasketballIcon,
	ExternalLinkIcon,
	RocketIcon,
} from 'naive-icons';

/**
 * naive-icons（React 组件库）的 Preact 适配层。
 *
 * 两个前置条件：
 * 1. 必须放在 components/preact/ 下 —— 项目同时注册了 preact 与 solid 两个 JSX 渲染器，
 *    astro.config.mjs 里靠 include 分流（preact 只接管 components/preact/，solid 只接管 components/solid/）。
 * 2. @astrojs/preact({ compat: true }) 会把 react / react-dom 别名到 @preact/compat，
 *    同时需要 astro.config.mjs 的 vite.ssr.noExternal 把 naive-icons 打包进来，
 *    否则 SSR 阶段会 externalize 到 Node 去加载真实 react，渲染器匹配失败。
 *
 * 不带 client: 指令使用时只做 SSR，产物零客户端 JS。
 *
 * 新增图标：从 'naive-icons' 引入对应组件，加进 registry 与 NaiveIconName 即可。
 */

export type NaiveIconName =
	| 'arrow-up-right'
	| 'badge-check'
	| 'basketball'
	| 'external-link'
	| 'rocket';

export interface NaiveIconProps {
	name: NaiveIconName;
	/** 尺寸，支持数字（px）或任意长度字符串，如 '1.75rem' / '0.85em' */
	size?: number | string;
	/** 描边色，默认跟随文字色 */
	color?: string;
	strokeWidth?: number | string;
	title?: string;
	class?: string;
}

const registry: Record<NaiveIconName, ComponentType<any>> = {
	'arrow-up-right': ArrowUpRightIcon,
	'badge-check': BadgeCheckIcon,
	basketball: BasketballIcon,
	'external-link': ExternalLinkIcon,
	rocket: RocketIcon,
};

export default function NaiveIcon({ name, color = 'currentColor', ...rest }: NaiveIconProps) {
	const Icon = registry[name];
	return <Icon color={color} {...rest} />;
}

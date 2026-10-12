import type { NaiveIconName } from '../components/preact/NaiveIcon';

export interface SiteLink {
	/** 站点名 */
	name: string;
	/** 外链地址 */
	url: string;
	/** 与本站的关系，一句话讲清“谁做的” */
	relation: string;
	/** 站点简介 */
	desc: string;
	/** 维护者说明 */
	owner: string;
	/** 维护者头像 */
	ownerAvatar: string;
	/** 站点属性标签 */
	facts: string[];
	/** 手绘图标名 */
	icon: NaiveIconName;
	/** 图标徽章点缀色，取自 naive-icons 复古调色板 */
	accent: string;
}

/** 我搭建并维护的其他站点 —— 新增条目直接往数组里加即可 */
export const siteLinks: SiteLink[] = [
	{
		name: 'GameFeeds · 游戏资讯',
		url: 'https://game-feeds.shawbo.wang/',
		relation: '我做的另一个站',
		desc: '聚合主流游戏媒体的最新资讯，每天自动抓取更新，一个页面刷完今天有什么好玩的。',
		owner: '由本站作者 shawbo 搭建并维护',
		ownerAvatar: '/assets/portrait.jpg',
		facts: ['个人项目', '维护中', '资讯聚合'],
		icon: 'basketball',
		accent: '#E76F51',
	},
];

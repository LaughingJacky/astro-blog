import type { NaiveIconName } from '../components/preact/NaiveIcon';

export interface SiteLink {
	/** 导航里的短名称 */
	navLabel: string;
	/** 站点名 */
	name: string;
	/** 外链地址 */
	url: string;
	/** 站点简介 */
	desc: string;
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
		navLabel: '游戏资讯',
		name: 'GameFeeds · 游戏资讯',
		url: 'https://game-feeds.shawbo.wang/',
		desc: '聚合主流游戏媒体的最新资讯，每天自动抓取更新，一个页面刷完今天有什么好玩的。',
		facts: ['资讯聚合', '主机新闻'],
		icon: 'basketball',
		accent: '#E76F51',
	},
	{
		navLabel: '公开直播',
		name: 'Open Stream · 公开直播',
		url: 'https://openstream.shawbo.wang/',
		desc: '靠着看的公开直播、独立动画和开源影片。',
		facts: ['动漫直播', '海外新闻台', '视频策展'],
		icon: 'monitor',
		accent: '#38BDF8',
	},
];

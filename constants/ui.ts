export interface INavItem {
    title: string;
    index: number;
    url: string;
    icon: string;
    insideView?: boolean;
    style?: any;
}

export type INavItemList = INavItem[];

export const ACTIVE_VIEW = {
    ARTICLE: {
        path: '',
        index: 0,
    },
    POST: {
        path: 'posts',
        index: 1,
    },
    COMMUNITY: {
        path: 'community',
        index: 2,
    },
    ME: {
        path: 'me',
        index: 3,
    },
    USER: {
        path: 'user',
        index: 4,
    },
};

export const NAVI_ITEMS: INavItemList = [
    {
        title: '文章',
        insideView: true,
        index: ACTIVE_VIEW.ARTICLE.index,
        url: ACTIVE_VIEW.ARTICLE.path,
        icon: 'icon-wenzhang1',
    },
    {
        title: '动态',
        insideView: true,
        index: ACTIVE_VIEW.POST.index,
        url: ACTIVE_VIEW.POST.path,
        icon: 'icon-planet1',
    },
    {
        title: '部落',
        insideView: true,
        index: ACTIVE_VIEW.COMMUNITY.index,
        url: ACTIVE_VIEW.COMMUNITY.path,
        icon: 'icon-shequ',
    },
    {
        title: '我の窝',
        insideView: true,
        url: ACTIVE_VIEW.ME.path,
        index: ACTIVE_VIEW.ME.index,
        icon: 'icon-home',
    },
    {
        title: '创作',
        url: '/editor',
        icon: 'icon-xiezuo',
        index: 5,
        style: {
            marginTop: '.2rem',
            color: '#fff',
            lineHeight: 1,
            borderRadius: '1rem',
            backgroundColor: 'var(--theme-editor)'
        }
    }
];

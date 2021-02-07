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
};

export const NAVI_ITEMS: INavItemList = [
    {
        title: '文章',
        index: ACTIVE_VIEW.ARTICLE.index,
        insideView: true,
        url: ACTIVE_VIEW.ARTICLE.path,
        icon: 'icon-wenzhang1',
    },
    {
        title: '动态',
        index: ACTIVE_VIEW.POST.index,
        insideView: true,
        url: ACTIVE_VIEW.POST.path,
        icon: 'icon-planet1',
    },
    {
        title: '部落',
        index: ACTIVE_VIEW.COMMUNITY.index,
        insideView: true,
        url: ACTIVE_VIEW.COMMUNITY.path,
        icon: 'icon-shequ',
    },
    {
        title: '我の窝',
        url: '/manage',
        icon: 'icon-home',
        index: 4,
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

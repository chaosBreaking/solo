export const ACTIVE_VIEW = {
    ARTICLE: '',
    POST: 'posts',
    COMMUNITY: 'community',
};

export const NAVI_ITEMS = [
    {
        title: '文章',
        index: ACTIVE_VIEW.ARTICLE,
        insideView: true,
        url: '',
        icon: 'icon-wenzhang1',
    },
    {
        title: '动态',
        index: ACTIVE_VIEW.POST,
        insideView: true,
        url: 'posts',
        icon: 'icon-planet1',
    },
    {
        title: '部落',
        index: ACTIVE_VIEW.COMMUNITY,
        insideView: true,
        url: 'community',
        icon: 'icon-shequ',
    },
    {
        title: '我の窝',
        url: '/home',
        icon: 'icon-home',
    },
    {
        title: '创作',
        url: '/editor',
        icon: 'icon-xiezuo',
        style: {
            marginTop: '.2rem',
            color: '#fff',
            lineHeight: 1,
            borderRadius: '1rem',
            backgroundColor: 'var(--theme-editor)'
        }
    }
];

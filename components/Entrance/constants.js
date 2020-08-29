export const STAGE_MAP = {
    START: 0,
    PRE_AUTH: 1,
    REGISTER: 2,
    LOGIN: 3,
};

export const AUTH_TYPE = {
    ERROR: -1,
    EMAIL: 0,
    PHONE: 1,
    MSG: 2,
    GITHUB: 3,
    GOOGLE: 4,
    FACEBOOK: 5,
};

export const ERROR_MAP = {
    ID: 0,
    PASSWD: 1,
    CONFIRM_PASSWD: 2,
    NICKNAME: 3,
    NETWORK: 4,
};

export const BG_IMAGES = [
    'http://solo-app.test.upcdn.net/home_bg-13mk9v-progressive.jpeg',
    // 'http://solo-app.test.upcdn.net/home_bg_xj3haef-progressive.jpeg',
];

export const NAVI_ITEM_TYPE = {
    LINK: 1,
    COLLECTION: 2,
    BUTTON: 3,
    SPECIAL: 4,
};

export const NAVI_ITEMS = [
    {
        title: '探索',
        url: ''
    },
    {
        title: '创作团',
        url: ''
    },
    {
        title: '活动',
        url: ''
    },
    {
        title: '会员',
        url: ''
    },
    {
        title: '关于',
        url: ''
    },
];

export const NAVI_FUNC_ITEMS = [
    {
        title: '入门资源',
        url: '',
    },
    {
        title: '创作者',
        url: '',
        type: NAVI_ITEM_TYPE.COLLECTION,
    },
    // {
    //     title: '登录',
    //     url: '',
    //     type: NAVI_ITEM_TYPE.BUTTON,
    // },
    {
        title: '登录',
        url: '/auth.html',
        type: NAVI_ITEM_TYPE.BUTTON,
    },
    {
        title: '注册',
        url: '/auth.html',
        type: NAVI_ITEM_TYPE.SPECIAL,
    },
];

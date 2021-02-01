
/* eslint-disable global-require */

const routes = {
    path: '',

    children: [
        {
            path: '/',
            load: () => import(/* webpackChunkName: 'entrance' */ './entrance'),
        },
        {
            path: '/auth.html',
            load: () => import(/* webpackChunkName: 'auth' */ './auth'),
        },
        {
            path: '/home.html',
            load: () => import(/* webpackChunkName: 'home' */ './home'),
        },
        {
            path: '/dashboard.html',
            load: () => import(/* webpackChunkName: 'dashboard' */ './dashboard'),
        },
        {
            path: '/manage.html',
            load: () => import(/* webpackChunkName: 'manage' */ './manage'),
        },
        {
            path: '/zone.html',
            load: () => import(/* webpackChunkName: 'zone' */ './zone'),
            children: [
                {
                    path: '',
                    load: () => import(/* webpackChunkName: 'zone' */ './zone'),
                },
                {
                    path: '/posts',
                    load: () => import(/* webpackChunkName: 'zone' */ './zone'),
                },
                {
                    path: '/community',
                    load: () => import(/* webpackChunkName: 'zone' */ './zone'),
                },
            ],
        },
        {
            path: '/explore.html',
            load: () => import(/* webpackChunkName: 'explore' */ './explore'),
        },
        {
            path: '/editor.html',
            load: () => import(/* webpackChunkName: 'editor' */ './editor'),
        },
        {
            path: '/page.html',
            load: () => import(/* webpackChunkName: 'page' */ './page'),
        },
        {
            path: '/article.html',
            load: () => import(/* webpackChunkName: 'article' */ './article'),
        },
        {
            path: '/verify.html',
            load: () => import(/* webpackChunkName: 'verify' */ './verify'),
        },

        // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
        // {
        //     path: '(.*)',
        //     load: () => import(/* webpackChunkName: 'home' */ './home'),
        // },
    ]
};

// The error page is available by permanent url for development mode
if (__DEV__) {
    routes.children.unshift({
        path: '/error.html',
        load: () => import(/* webpackChunkName: 'error' */ './error'),
        // action: require('./error').default,
    });
}

export default routes;

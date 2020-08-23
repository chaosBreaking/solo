
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
            path: '/zone.html',
            load: () => import(/* webpackChunkName: 'zone' */ './zone'),
        },
        {
            path: '/explore.html',
            load: () => import(/* webpackChunkName: 'explore' */ './explore'),
        },
        {
            path: '/intro.html',
            load: () => import(/* webpackChunkName: 'intro' */ './intro'),
        },
        {
            path: '/editor.html',
            load: () => import(/* webpackChunkName: 'editor' */ './editor'),
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

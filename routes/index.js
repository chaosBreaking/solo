
/* eslint-disable global-require */

const routes = {
    path: '',

    children: [
        {
            path: '/',
            load: () => import(/* webpackChunkName: 'entrance' */ './entrance'),
        },
        {
            path: '/home.html',
            load: () => import(/* webpackChunkName: 'home' */ './home'),
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
            path: '/test.html',
            load: () => import(/* webpackChunkName: 'test' */ './test'),
        },

        // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
        // {
        //     path: '(.*)',
        //     load: () => import(/* webpackChunkName: 'home' */ './home'),
        // },
    ]
};

// The error page is available by permanent url for development mode
// if (__DEV__) {
//     routes.children.unshift({
//         path: '/error',
//         action: require('./error').default,
//     });
// }

export default routes;

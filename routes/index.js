
/* eslint-disable global-require */

const routes = {
    path: '',

    children: [
        {
            path: '/',
            load: () => import(/* webpackChunkName: 'home' */ './home'),
        },
        {
            path: '/index.html',
            load: () => import(/* webpackChunkName: 'home' */ './home'),
        },
        {
            path: '/explore.html',
            load: () => import(/* webpackChunkName: 'explore' */ './explore'),
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

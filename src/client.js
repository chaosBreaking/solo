import 'intersection-observer';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import history from './history';
import router from './router';
import buildContext from './contextBuilder';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import smoothscroll from 'smoothscroll-polyfill';
import { getCookieByName } from '@utils/cookie';

smoothscroll.polyfill();

if (!__DEV__) {
    Sentry.init({
        dsn: 'https://02608ec44c184ec485d2661cb44902e9@o438321.ingest.sentry.io/5402805',
        integrations: [
            new Integrations.BrowserTracing(),
        ],
        tracesSampleRate: 1.0,
    });
}

// Enables critical path CSS rendering
// https://github.com/kriasoft/isomorphic-style-loader
const insertCss = (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => {
        removeCss.forEach(f => f());
    };
};

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = buildContext();

const container = document.getElementById('app');

async function init() {
    let route;
    try {
        route = await router.resolve(context);
    } catch (error) {
        console.error('cannot resolve route', error);
        return;
    }

    if (route.redirect) {
        history.replace(route.redirect);
        return;
    }
    if (!route.component) return;
    render(route.component, window.__ssrData, context);
}

async function render(Component, ssrData = {}, context) {
    try {
        const isServerRender = ssrData.ssr;
        const storeMap = isServerRender
            ? await Component.rebuildStore(context, ssrData.storeMap)
            : await Component.initializeProps(context);
        const renderReactApp = isServerRender ? ReactDOM.hydrate : ReactDOM.render;
        const initialData = { context, ...storeMap };

        renderReactApp(
            <App insertCss={insertCss}>
                <Component {...initialData} />
            </App>,
            container,
            () => { },
        );
    } catch (error) {
        if (__DEV__) {
            throw error;
        }
        console.error(error);
    }
}

(function syncAccessToken() {
    const accessToken = getCookieByName('token');

    const originToken = localStorage.getItem('token') || '';
    try {
        if (accessToken.length > 0 && originToken !== accessToken) {
            localStorage.setItem('token', accessToken);
        }
        if (accessToken.length === 0) {
            localStorage.setItem('token', null);
        }
    } catch (error) {
    }
})();

init();

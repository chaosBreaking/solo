import 'intersection-observer';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import history from './history';
import router from './router';
import buildContext from './contextBuilder';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

// if (!__DEV__) {
Sentry.init({
    dsn: 'https://02608ec44c184ec485d2661cb44902e9@o438321.ingest.sentry.io/5402805',
    integrations: [
        new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
});
// }

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

async function init () {
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

async function render (Component, ssrData = {}, context) {
    try {
        const isInitialRender = ssrData.ssr;
        const initialData = { context };
        // const initialData = isInitialRender ? { ...ssrData.store } : { ...await Component.initializeProps(context) };
        initialData.store = isInitialRender
            ? await Component.rebuildStore({ context, ...ssrData.store })
            : await Component.initializeProps(context);
        const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
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

init();


import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import App from './components/App';
import history from './history';
import router from './router';
// import * as Sentry from '@sentry/browser';

// Sentry.init({ dsn: 'https://cc95f9289e7e4f79ae2c723dac9f7442@sentry.io/5188590' });

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
const context = {
    // Universal HTTP client
    // fetch: createFetch(fetch, {
    //     baseUrl: window.App.apiUrl,
    // }),
};

const container = document.getElementById('app');

async function init () {
    context.pathname = location.pathname;
    context.query = queryString.parse(location.search);
    let route;
    try {
        route = await router.resolve(context);
    } catch (error) {
        console.error('cannot resolve route');
    }

    if (route.redirect) {
        history.replace(route.redirect);
        return;
    }
    if (!route.component) return;

    const { data } = window.__ssrData;
    render(route.component, data, context);
}

async function render (Component, ssrData = {}, context) {
    try {
        const isInitialRender = ssrData.ssr;
        if (!isInitialRender) {
            // csr
            const context = {};
            if (Component.Store) {
                const store = new Component.Store();
                await store.initializeData(context);
                store.prepareClientData();
                ssrData.store = store;
            }
        }
        const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
        renderReactApp(
            <App insertCss={insertCss}>
                <Component {...ssrData} />
            </App>,
            container,
            () => {},
        );
    } catch (error) {
        if (__DEV__) {
            throw error;
        }
        console.error(error);
    }
}

init();

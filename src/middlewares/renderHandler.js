import React from 'react';
import ReactDOM from 'react-dom/server';
import chunks from './chunk-manifest.json';
import config from '../config';
import App from '../components/App';
import Html from '../components/Html';

export default async (req, res, next) => {
    try {
        const route = res.locals.route;
        if (!route) {
            return next();
        }
        const css = new Set();
        const scripts = new Set();
        // Enables critical path CSS rendering
        // https://github.com/kriasoft/isomorphic-style-loader
        const insertCss = (...styles) => {
            styles.forEach(style => css.add(style._getCss()));
        };
        const addChunk = chunk => {
            if (chunks[chunk]) {
                chunks[chunk].forEach(asset => scripts.add(asset));
            } else if (__DEV__) {
                throw new Error(`Chunk with name '${chunk}' cannot be found`);
            }
        };
        addChunk('client');

        if (route.chunk) addChunk(route.chunk);
        if (route.chunks) route.chunks.forEach(addChunk);

        const context = {
            pathname: req.path,
            query: req.query,
        };
        let rawData = {};
        const data = { ...route };

        if (!res.locals.ssr) {
            rawData = {
                ssr: false,
            };
        } else {
            rawData.ssr = true;
            const Component = route.component;
            if (Component.Store) {
                const store = new Component.Store();
                await store.initializeData({ req, res });
                store.prepareServerData();
                rawData.store = store;
            }
            data.children = ReactDOM.renderToString(
                <App insertCss={insertCss}>
                    <Component {...rawData} />
                </App>,
            );
        }

        data.app = {
            apiUrl: config.api.clientUrl,
        };
        data.rawData = rawData;
        data.styles = [{ id: 'css', cssText: [...css].join('') }];
        data.scripts = Array.from(scripts);

        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(route.status || 200);
        res.send(`<!doctype html>${html}`);
    } catch (err) {
        next(err);
    }
};

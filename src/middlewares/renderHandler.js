import React from 'react';
import ReactDOM from 'react-dom/server';
import chunks from './chunk-manifest.json';
import config from '../config';
import App from '../components/App';
import Html from '../components/Html';
import buildContext from '../contextBuilder';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default async (req, res, next) => {
    try {
        // todo: cache common page
        const route = res.locals.route;
        if (!route) {
            return next();
        }
        const css = new Set();
        const scripts = new Set();
        const sheets = new ServerStyleSheets();
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

        let rawData = {};
        const data = { ...route };

        if (!res.locals.ssr) {
            rawData = {
                ssr: false,
            };
        } else {
            rawData.ssr = true;
            const Component = route.component;
            const context = buildContext({ req, res });
            const store = await Component.initializeProps(context);
            rawData.store = store;
            data.children = ReactDOM.renderToString(
                sheets.collect(
                    <App insertCss={insertCss}>
                        <Component {...rawData} />
                    </App>,
                ),
            );
        }
        data.app = {
            apiUrl: config.api.clientUrl,
        };
        data.rawData = rawData;
        data.styles = [{ id: 'css', cssText: [...css].join('') }];
        data.scripts = Array.from(scripts);
        data.mdStyles = sheets.toString();

        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(route.status || 200);
        res.send(`<!doctype html>${html}`);
    } catch (err) {
        next(err);
    }
};

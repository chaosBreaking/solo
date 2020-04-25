
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from './config';
import routeHandler from './middlewares/routeHandler';
import renderHandler from './middlewares/renderHandler';
import errorHandler from './middlewares/errorHandler';

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    // send entire app down. Process manager will restart it
    process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*.html', routeHandler, renderHandler);
app.get('*', routeHandler, renderHandler);

//
// Error handling
// -----------------------------------------------------------------------------

app.use(errorHandler);

//
// Launch the server
// -----------------------------------------------------------------------------

if (!module.hot) {
    app.listen(config.port, () => {
        console.info(`The server is running at http://localhost:${config.port}/`);
    });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
    app.hot = module.hot;
    module.hot.accept('./router');
}

export default app;

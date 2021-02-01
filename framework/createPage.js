import React from 'react';
import { Provider } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { withProfiler } from '@sentry/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from './axios';
import s from '@src/static/basic.scss';

const theme = createMuiTheme({
    typography: {
        htmlFontSize: 160,
    },
    palette: {
        primary: {
            main: '#F75757',
        },
        secondary: {
            main: '#4791db',
        },
        info: {
            main: '#4791db'
        }
    },
});

const enhanceAxios = context => {
    let token;
    if (process.env.BROWSER) {
        const { cookie } = context;
        token = cookie.token;
    } else {
        const { req, res } = context;
        axios.__req = req;
        axios.__res = res;
        token = res.locals.token;
    }
    if (!token) {
        console.warn('Missing token');
    } else {
        axios.defaults.headers.common.token = token;
    }
    return axios;
};

export default (options = {}) => {
    return Component => {
        const { Store, pageInfo = {} } = options;

        class Page extends React.Component {
            static Store = Store
            static pageInfo = pageInfo;

            constructor(props) {
                super(props);
                this.initialProps = {
                    context: props.context,
                    store: props.store || {},
                };
            }

            static async initializeProps(context) {
                const store = new Store({ getContext: () => ({ ...context }) });
                const axios = enhanceAxios(context);
                store.initService(axios);
                await store.initializeData(context);
                const hookFunc = process.env.BROWSER ? store.prepareClientData : store.prepareServerData;
                typeof hookFunc === 'function' && await hookFunc();
                return store;
            }

            static async rebuildStore(context, ssrData) {
                const store = new Store({
                    getContext: () => ({ ...context })
                });
                store.hydrateData(ssrData);
                const axios = enhanceAxios(context);
                store.initService(axios);
                typeof store.prepareClientData === 'function' && await store.prepareClientData();
                return store;
            }

            componentDidMount() {
                document.title = pageInfo.title || document.title;
            }

            render() {
                return (
                    <ThemeProvider theme={theme}>
                        <Provider {...this.initialProps}>
                            <Component />
                        </Provider>
                    </ThemeProvider>
                );
            }
        }

        return withProfiler(withStyles(s)(Page));
    };
};

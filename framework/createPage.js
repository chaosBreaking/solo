import React from 'react';
import { Provider } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { withProfiler } from '@sentry/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from './axios';
import s from '@src/static/basic.scss';

React.useLayoutEffect = React.useEffect;

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

interface IStores {
    [string]: any;
};
interface IOptions {
    pageInfo?: any;
    forceLogin?: boolean;
}

export default (Stores: IStores, options: IOptions = {}): any => {
    return Component => {
        const { pageInfo = {}, forceLogin, } = options;

        class Page extends React.Component {
            static Stores = Stores;
            static pageInfo = pageInfo;

            static async initializeProps(context) {
                const storeMap = {};
                const initTasks = [];
                const hookTasks = [];
                const axios = enhanceAxios(context);
                const keys = Object.keys(Stores);
                keys.forEach(key => {
                    const store = new Stores[key]();
                    store.initService(axios);
                    storeMap[key] = store;
                    initTasks.push(store.initializeData(context));
                    const hookFunc = process.env.BROWSER ? store.prepareClientData : store.prepareServerData;
                    hookTasks.push(hookFunc());
                });
                // 数据初始化和hook是串行
                await Promise.all(initTasks);
                await Promise.all(hookTasks);
                return storeMap;
            }

            static async rebuildStore(context, serverStoreDataMap) {
                const storeMap = {};
                const hookTasks = [];
                const axios = enhanceAxios(context);
                const keys = Object.keys(Stores);
                keys.forEach(key => {
                    const store = new Stores[key]();
                    const ssrData = serverStoreDataMap[key];
                    store.hydrateData(ssrData);
                    store.initService(axios);
                    hookTasks.push(store.prepareClientData());
                    storeMap[key] = store;
                });
                await Promise.all(hookTasks);
                return storeMap;
            }

            componentDidMount() {
                document.title = pageInfo.title || document.title;
            }

            render() {
                return (
                    <ThemeProvider theme={theme}>
                        <Provider {...this.props}>
                            <Component />
                        </Provider>
                    </ThemeProvider>
                );
            }
        }

        return withProfiler(withStyles(s)(Page));
    };
};

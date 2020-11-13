import { setCookie } from '@utils/cookie';
import { replacePage } from '@utils/navi';

const getAPIUrl = apiPath => {
    const commonHost = __DEV__ ? 'http://localhost:6057/api/' : 'http://api.hyperii.com/api/';

    const path = apiPath.startsWith('/') ? apiPath.slice(1) : apiPath;
    return commonHost + path;
};

export default class BaseService {
    constructor(axios) {
        if (!axios) {
            throw new Error('Need to inject axios');
        }
        this.axios = axios;
    }

    async __request(method, url, ...rest) {
        try {
            const res = await this.axios[method](url, ...rest);
            const { data, headers } = res;
            return { headers, data };
        } catch (error) {
            const { status } = error;
            if (status === 403) {
                this.redirectLogin();
                throw new Error('Need login');
            }
        }
    }

    async get(url, queryParams = {}, configs = {}) {
        try {
            const token = localStorage.getItem('accessToken');
            configs.headers = {
                token
            };
        } catch (error) {
        }
        return this.__request('get', url, {
            params: queryParams,
            ...configs
        }, configs);
    }

    async post(url, params, configs = {}) {
        try {
            const token = localStorage.getItem('accessToken');
            configs.headers = {
                token
            };
        } catch (error) {
        }
        return this.__request('post', url, params, configs);
    }

    redirectLogin() {
        if (process.env.BROWSER) {
            localStorage.removeItem('token');
            setCookie({ token: '' });
            replacePage('/auth.html');
        } else {

        }
    }
};

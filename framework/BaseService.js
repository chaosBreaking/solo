import { replacePage } from '@utils/navi';
import { getAccessToken, setAccessToken } from './auth';

const AUTH_PAGE = '/auth.html';
export default class BaseService {
    constructor(axios) {
        if (!axios) {
            throw new Error('Need to inject axios');
        }
        this.axios = axios;
    }

    async __request(method, url, ...rest) {
        try {
            if (process.env.BROWSER) {
                // 客户端每次请求都要从cookie拿token
                const token = getAccessToken();
                this.axios.defaults.headers.common.token = token;
            }
            const res = await this.axios[method](url, ...rest);
            const { data, headers } = res;
            return { headers, data };
        } catch (error) {
            const { status } = error;
            if (status === 403 || status === 401) {
                this.redirectLogin();
            }
            throw error;
        }
    }

    async get(url, queryParams = {}, configs = {}) {
        return this.__request('get', url, {
            params: queryParams,
            ...configs
        }, configs);
    }

    async post(url, params, configs = {}) {
        return this.__request('post', url, params, configs);
    }

    redirectLogin() {
        if (process.env.BROWSER) {
            setAccessToken('');
            replacePage(AUTH_PAGE);
        } else {
            this.axios.__res.redirect(AUTH_PAGE);
        }
    }
};

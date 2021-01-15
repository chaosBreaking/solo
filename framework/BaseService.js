import { setCookie } from '@utils/cookie';
import { replacePage } from '@utils/navi';

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
            const res = await this.axios[method](url, ...rest);
            const { data, headers } = res;
            return { headers, data };
        } catch (error) {
            const { status } = error;
            if (status === 403) {
                this.redirectLogin();
                throw new Error('Need login');
            }
            throw error;
        }
    }

    async get(url, queryParams = {}, configs = {}) {
        try {
            const token = localStorage.getItem('token');
            configs.headers = {
                token
            };
        } catch (error) {
            return {
                success: false,
                error: error?.message
            };
        }
        return this.__request('get', url, {
            params: queryParams,
            ...configs
        }, configs);
    }

    async post(url, params, configs = {}) {
        try {
            const token = localStorage.getItem('token');
            configs.headers = {
                token
            };
        } catch (error) {
            return {
                success: false,
                error: error?.message
            };
        }
        return this.__request('post', url, params, configs);
    }

    redirectLogin() {
        if (process.env.BROWSER) {
            localStorage.removeItem('token');
            setCookie({ token: '' });
            replacePage(AUTH_PAGE);
        } else {
            this.axios.__res.redirect(AUTH_PAGE);
        }
    }
};

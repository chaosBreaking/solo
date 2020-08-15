import axios from 'axios';

export default class BaseService {
    async __request (method, ...rest) {
        const res = await axios[method](...rest);
        const { data, headers } = res;
        return { headers, data };
    }

    async get (url, queryParams = {}) {
        return this.__request('get', url, {
            params: queryParams,
        });
    }

    async post (url, params, configs) {
        return this.__request('post', url, params, configs);
    }
};

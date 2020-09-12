import axios from 'axios';
import enhanceRequest from './enhanceRequest';

enhanceRequest(axios);

const getAPIUrl = apiPath => {
    const commonHost = __DEV__ ? 'http://localhost:6842/api/' : 'http://api.hyperii.com/api/';

    const path = apiPath.startsWith('/') ? apiPath.slice(1) : apiPath;
    return commonHost + path;
};

export default class BaseService {
    async __request(method, url, ...rest) {
        const reqUrl = getAPIUrl(url);
        const res = await axios[method](reqUrl, ...rest);
        const { data, headers } = res;
        return { headers, data };
    }

    async get(url, queryParams = {}) {
        return this.__request('get', url, {
            params: queryParams,
        });
    }

    async post(url, params, configs) {
        return this.__request('post', url, params, configs);
    }
};

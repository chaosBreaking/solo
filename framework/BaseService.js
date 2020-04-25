import axios from 'axios';

export default class BaseService {
    get (url, query = {}) {
        return axios.get(url, {});
    }

    post (url, params) {
        return axios.post(url, params);
    }
};

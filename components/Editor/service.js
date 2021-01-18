import BaseService from '@framework/BaseService';

const API = {
    PUBLISH: 'article/publish',
    REQUEST_TOKEN: 'cloud/get_policy',
};

export default class ContentService extends BaseService {
    publishContent = async formData => {
        const res = await this.post(API.PUBLISH, formData).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    requestTokenFunc = async params => {
        const res = await this.get(API.REQUEST_TOKEN, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    redirectLogin = () => {
        if (process.env.BROWSER) {
            const error = new Error();
            error.message = 'Need login';
            error.code = 403;
            throw error;
        } else {
            // 服务端走默认的重定向逻辑
            super.redirectLogin();
        }
    }
};

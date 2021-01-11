import BaseService from '@framework/BaseService';

const API = {
    PUBLISH: 'content/publish',
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
};

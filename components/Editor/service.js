import BaseService from '@framework/BaseService';

const API = {
    PUBLISH: 'auth/new',
};

export default class ContentService extends BaseService {
    publishContent = async formData => {
        const res = await this.post(API.PUBLISH, { data: formData }).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

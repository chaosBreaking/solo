import BaseService from '@framework/BaseService';

const URLs = {
    LIST: 'article/list',
};

export default class ContentService extends BaseService {
    async getContentList(params) {
        const res = await this.get(URLs.LIST, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

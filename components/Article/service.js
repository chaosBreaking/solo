import BaseService from '@framework/BaseService';

const URLs = {
    QUERY_DATA: 'article/query',
};

export default class ContentService extends BaseService {
    queryArticle = async params => {
        const res = await this.get(URLs.QUERY_DATA, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

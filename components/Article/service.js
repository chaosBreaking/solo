import BaseService from '@framework/BaseService';

const URLs = {
    QUERY_DATA: 'article/query',
    FOLLOW: 'user/follow',
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

    follow = async params => {
        const res = await this.post(URLs.FOLLOW, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

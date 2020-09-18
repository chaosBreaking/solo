import BaseService from '@framework/BaseService';

const URLs = {
    QUERY_DATA: 'news/query',
    QUERY_TABS: 'common/tabs',
};

export default class ContentService extends BaseService {
    getContentData = async params => {
        const res = await this.get(URLs.QUERY_DATA, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    getTabs = async () => {
        const res = await this.get(URLs.QUERY_TABS).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

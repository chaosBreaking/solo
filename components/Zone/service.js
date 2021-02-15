import BaseService from '@framework/BaseService';

const URLs = {
    LIST: 'article/list',
    POSTS: 'post/list',
    COMMUNITY: 'community/list',
    PUBLISH_POST: 'post/publish',
};

export default class ContentService extends BaseService {
    getContentList = async (params) => {
        const res = await this.get(URLs.LIST, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    getPostList = async (params) => {
        const res = await this.get(URLs.POSTS, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    getCommunityList = async (params) => {
        const res = await this.get(URLs.COMMUNITY, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    publishPost = async (params) => {
        const res = await this.post(URLs.PUBLISH_POST, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

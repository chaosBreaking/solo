import BaseService from '@framework/BaseService';

const URLs = {
    LIST: 'article/list',
    POSTS: 'post/list',
    COMMUNITY: 'community/list',
    PUBLISH_POST: 'post/publish',
    COMMENT: 'post/comment',
    QUERY_COMMENT: 'post/comments',
};

export default class ContentService extends BaseService {
    getContentList = async params => {
        const res = await this.get(URLs.LIST, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    getPostList = async params => {
        const res = await this.get(URLs.POSTS, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    getCommunityList = async params => {
        const res = await this.get(URLs.COMMUNITY, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    publishPost = async params => {
        const res = await this.post(URLs.PUBLISH_POST, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    comment = async params => {
        const res = await this.post(URLs.COMMENT, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    queryComments = async params => {
        const res = await this.get(URLs.QUERY_COMMENT, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

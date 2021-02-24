import BaseService from '@framework/BaseService';

const URLs = {
    LIST: 'article/list',
    POSTS: 'post/list',
    COMMUNITY: 'community/list',
    PUBLISH_POST: 'post/publish',
    COMMENT: 'post/comment',
    QUERY_COMMENT: 'post/comments',
    DELETE_POST: 'post/delete',
    QUERY_MY_POST: 'post/user/list',
    QUERY_MY_ARTICLE: 'article/user/list',
    QUERY_MY_COMMUNITY: 'community/user/list',
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

    deletePost = async params => {
        const res = await this.post(URLs.DELETE_POST, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    getMyArticleList = async params => {
        const res = await this.post(URLs.QUERY_MY_ARTICLE, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    getMyPostList = async params => {
        const res = await this.post(URLs.QUERY_MY_POST, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    getMyCommunityList = async params => {
        const res = await this.post(URLs.QUERY_MY_COMMUNITY, params).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

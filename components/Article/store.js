import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import ContentService from './service';
import { ACTIVE_VIEW, NAVI_ITEMS } from '@constants/ui';
import { forward } from '@utils/navi';

export default class Store extends CommonStore {
    @observable author;
    @observable data;
    @observable loadError;
    @observable errorMsg;
    @observable activeView = ACTIVE_VIEW.ARTICLE.index;

    id;
    navItems = NAVI_ITEMS;
    contentService;

    @action.bound
    async initializeData({ query }) {
        const { id } = query;
        this.id = id;
        await this.queryArticle();
    }

    initService(axios) {
        this.contentService = new ContentService(axios);
    }

    @action.bound
    async queryArticle() {
        try {
            const res = await this.contentService.queryArticle({
                _id: this.id
            });
            const { author, ...rest } = res;
            this.data = rest;
            this.author = author;
        } catch (error) {
            console.error(error);
            this.loadError = true;
            this.errorMsg = error.message || error.msg;
        }
    }

    @action.bound
    handleNav(item) {
        const { url, insideView } = item;
        if (insideView) {
            forward(`/zone.html/${url}`, { noAddingHtml: true });
        } else {
            forward(url);
        }
    }

    @action.bound
    async followHandler(params) {
        const res = await this.contentService.follow(params);
        const { success, canceled } = res || {};
        if (!success) {
            return;
        }
        if (canceled) {
            this.author.followed = false;
        } else {
            this.author.followed = true;
        }
    }
}

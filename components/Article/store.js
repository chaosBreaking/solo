import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import ContentService from './service';
import { ACTIVE_VIEW, NAVI_ITEMS } from '@constants/ui';
import { forward } from '@utils/navi';

export default class Store extends CommonStore {
    @observable data;
    @observable loadError;
    @observable errorMsg;
    @observable activeView = ACTIVE_VIEW.ARTICLE;
    @observable mainTabs = [{ title: '推荐', }, { title: '最新', }, { title: '关注' }];

    id;
    navItems = NAVI_ITEMS;
    contentService;

    @action.bound
    async initializeData(requestContext) {
        const { query } = requestContext;
        // test only
        const { id = '60055b8025484b9206a51b96' } = query;
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
            this.data = res;
            return this.data;
        } catch (error) {
            console.error(error);
            this.loadError = true;
            this.errorMsg = error.message || error.msg;
        }
    }

    @action.bound
    handleNav(item) {
        const { url, index, insideView } = item;
        if (index === this.activeView) {
            return;
        }
        if (insideView) {
            forward(`/zone.html/${url}`, { noAddingHtml: true });
        } else {
            forward(url);
        }
    }
}

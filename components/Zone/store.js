import { observable, action, runInAction } from 'mobx';
import CommonStore from '@framework/CommonStore';
import ContentService from './service';
import { ACTIVE_VIEW, NAVI_ITEMS } from './constants';
import { forward } from '@utils/navi';

const count = 10;
export default class Store extends CommonStore {
    offset = 0;
    navItems = NAVI_ITEMS;

    @observable dataList = [];
    @observable offsetId = '';
    @observable loadingStatus = 0;
    @observable activeView = ACTIVE_VIEW.ARTICLE;
    @observable hasMore = true;
    @observable mainTabs = [{ title: '推荐', }, { title: '最新', }, { title: '关注' }];

    @action.bound
    async initializeData(requestContext) {
        const { pathname } = requestContext;
        this.checkActiveView(pathname);
        await this.loadMore();
        return {};
    }

    initService(axios) {
        this.contentService = new ContentService(axios);
    }

    @action.bound
    checkActiveView(pathname) {
        if (pathname.endsWith(ACTIVE_VIEW.POST)) {
            this.activeView = ACTIVE_VIEW.POST;
        } else if (pathname.endsWith(ACTIVE_VIEW.COMMUNITY)) {
            this.activeView = ACTIVE_VIEW.COMMUNITY;
        } else {
            this.activeView = ACTIVE_VIEW.ARTICLE;
        }
    }

    @action.bound
    setActiveView(view) {
        if (view !== this.activeView) {
            this.activeView = view;
        }
    }

    @action.bound
    async loadMore() {
        this.loadingStatus = 1;
        if (!this.hasMore) {
            this.loadingStatus = -1;
            return;
        }
        const data = await this.contentService.getContentList({
            offset: this.offset,
            offsetId: this.offsetId,
            count,
        });
        runInAction(() => {
            if (!data || !data.length) {
                this.hasMore = false;
                this.loadingStatus = -1;
            } else {
                this.offset += data.length;
                this.dataList.push(...data);
                this.offsetId = data[data.length - 1]._id;
                this.loadingStatus = 0;
            }
        });
    }

    @action.bound
    handleNav(item) {
        const { insideView, url, index } = item;
        if (index === this.activeView) {
            return;
        }
        if (insideView) {
            const dest = `/zone.html/${url}`;
            history.pushState({ activeView: index }, '', dest);
            this.activeView = index;
        } else {
            forward(url);
        }
    }
}

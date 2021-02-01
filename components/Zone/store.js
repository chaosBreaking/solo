import { observable, action, runInAction } from 'mobx';
import CommonStore from '@framework/CommonStore';
import ContentService from './service';

const count = 10;
export default class Store extends CommonStore {
    @observable dataList = [];
    @observable offsetId = '';
    @observable loadingStatus = 0;
    @observable hasMore = true;
    @observable mainTabs = [{ title: 'tab1', }, { title: 'tab2', }, { title: 'tab3' }];
    offset = 0;

    @action.bound
    async initializeData(requestContext) {
        await this.loadMore();
        return {};
    }

    initService(axios) {
        this.contentService = new ContentService(axios);
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
}

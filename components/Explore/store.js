import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import ContentService from './service';

export default class Store extends CommonStore {
    @observable dataList = [];
    @observable loadingStatus = 0;

    @action.bound
    async initializeData(requestContext) {
        this.dataList = Array.from({ length: 21 }).map((_, index) => ({
            index,
            height: Math.random() + 1
        }));
        return {};
    }

    initService(axios) {
        this.contentService = new ContentService(axios);
    }

    @action.bound
    async loadMore() {
        this.loadingStatus = 1;
        const offset = this.dataList.length;
        const data = await new Promise(resolve => {
            setTimeout(() => {
                resolve(Array.from({ length: 21 }).map((_, index) => ({
                    index: index + offset,
                    height: Math.random() + 1
                })));
            }, 500);
        });
        this.dataList.push(...data);
        this.loadingStatus = 0;
    }
}

import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import ContentService from './service';

export default class Store extends CommonStore {
    @observable dataList = [];
    @observable loadingStatus = 0;

    @action.bound
    async initializeData(requestContext) {
        // this.dataList = Array.from({ length: 21 }).map((_, index) => ({
        //     index,
        //     height: Math.random() + 1
        // }));
        return {};
    }

    initService(axios) {
        this.contentService = new ContentService(axios);
    }

    @action.bound
    async loadMore() {
        this.loadingStatus = 1;
        const offset = this.dataList.length;
        if (offset > 40) {
            this.loadingStatus = -1;
            return;
        }
        const data = await new Promise(resolve => {
            setTimeout(() => {
                resolve(Array.from({ length: 21 }).map((_, index) => ({
                    index: index + offset,
                    content: `我为什么创建Solo？为了更好的连接创作者和观众，为数字游民digital nomad和独立创作者creators提供创作、展示和链接的工具。
                    创作者从创作到发布，获得关注和支持以及报酬。
                    订阅者和支持者获得与创作者/博主的互动机会、相关经验和第一手的信息以及资料。`,
                })));
            }, 500);
        });
        this.dataList.push(...data);
        this.loadingStatus = 0;
    }
}

import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';

const getRandomString = length => Array.from({ length }).fill(String.fromCharCode(~~(65 + 100 * Math.random() % 32)));

export default class Store extends CommonStore {
    @observable
    repoList = [];

    @action.bound
    async initializeData (requestContext) {
        this.repoList = Array.from({ length: 10 }).map((_, index) => ({
            index,
            title: getRandomString(8)
        }));
        return {};
    }

    @action.bound
    async loadMore () {
        this.loadingStatus = 1;
        const offset = this.dataList.length;
        const data = await new Promise(resolve => {
            setTimeout(() => {
                resolve(Array.from({ length: 21 }).map((_, index) => ({
                    index: index + offset,
                    height: Math.random() + 1
                })));
            }, 1000);
        });
        this.dataList.push(...data);
        this.loadingStatus = 0;
    }
}

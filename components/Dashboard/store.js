import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';

const getRandomString = length => Array.from({ length }).fill(String.fromCharCode(~~(65 + 100 * Math.random() % 32)));

export default class Store extends CommonStore {
    @observable
    repoList = [];

    @observable
    timeline = [];

    @observable
    loadingStatus = 0;

    @observable
    loadingActivityStatus = 0;

    @action.bound
    async initializeData (requestContext) {
        this.repoList = Array.from({ length: 10 }).map((_, index) => ({
            index,
            title: getRandomString(8)
        }));
        this.timeline = Array.from({ length: 10 }).map((_, index) => ({
            index,
            title: getRandomString(8)
        }));
        return {};
    }

    @action.bound
    async loadMore () {
        this.loadingStatus = 1;
        const data = await new Promise(resolve => {
            setTimeout(() => {
                resolve(
                    Array.from({ length: 5 }).map((_, index) => ({
                        index,
                        title: getRandomString(8)
                    }))
                );
            }, 1000);
        });
        this.repoList.push(...data);
        this.loadingStatus = 0;
    }

    @action.bound
    async loadMoreActivity () {
        this.loadingActivityStatus = 1;
        const data = await new Promise(resolve => {
            setTimeout(() => {
                resolve(
                    Array.from({ length: 10 }).map((_, index) => ({
                        index,
                        title: getRandomString(8)
                    }))
                );
            }, 1000);
        });
        this.timeline.push(...data);
        this.loadingActivityStatus = 0;
    }
}

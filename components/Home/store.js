import CommonStore from '@framework/CommonStore';

export default class Store extends CommonStore {
    async fetchInitialData (requestContext) {
        this.info = 'xxx';
        return { pageInfo: { title: 'home' } };
    }
}

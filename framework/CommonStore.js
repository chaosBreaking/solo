// import { observable, action } from 'mobx';
import axios from 'axios';

export default class CommonStore {
    get rootStore () {
        return typeof this.getRoot === 'function' && this.getRoot();
    }

    request (service, ...params) {
        return service(axios, ...params);
    }

    /**
     * @desc Store数据初始化，用于SSR/CSR时根store的数据请求
     * @param {*} requestContext
     * @returns
     * @memberof CommonStore
     */
    async fetchInitialData (requestContext) {
        return { pageInfo: { title: 'home' } };
    }
}

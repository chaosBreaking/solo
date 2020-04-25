export default class CommonStore {
    get rootStore () {
        return typeof this.getRoot === 'function' && this.getRoot();
    }

    /**
     * @desc Store数据初始化，用于SSR/CSR时根store的数据请求
     * @param {*} requestContext
     * @returns
     * @memberof CommonStore
     */
    async initializeData (requestContext) {
        return {};
    }

    /**
     * @desc 服务端渲染数据hook
     * @param {*} requestContext
     * @returns
     * @memberof CommonStore
     */
    async prepareServerData () {}

    /**
     * @desc 客户端渲染数据hook
     * @param {*} requestContext
     * @returns
     * @memberof CommonStore
     */
    async prepareClientData () {}
}

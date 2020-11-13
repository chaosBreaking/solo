export default class CommonStore {
    constructor(props) {
        Object.assign(this, props);
    }

    get rootStore() {
        return typeof this.getRoot === 'function' && this.getRoot();
    }

    get context() {
        return typeof this.getContext === 'function' && this.getContext();
    }

    /**
     * @desc Store数据初始化，用于SSR/CSR时根store的数据请求
     * @param {*} requestContext
     * @returns
     * @memberof CommonStore
     */
    async initializeData(requestContext) {
        return {};
    }

    /**
     * @desc 创建同构axios
     * @param {*} enhancedAxios
     * @returns
     * @memberof CommonStore
     */
    async initService(enhancedAxios) {
        return {};
    }

    /**
     * @desc 服务端渲染数据hook
     * @param {*} requestContext
     * @returns
     * @memberof CommonStore
     */
    async prepareServerData() { }

    /**
     * @desc 客户端渲染数据hook
     * @param {*} requestContext
     * @returns
     * @memberof CommonStore
     */
    async prepareClientData() { }
}

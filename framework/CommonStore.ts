export default class CommonStore {
    getContext: any;
    constructor(props: any) {
        Object.assign(this, props);
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
    async initializeData(requestContext: any) {
        return {};
    }

    /**
     * @desc 创建同构axios
     * @param {*} enhancedAxios
     * @returns
     * @memberof CommonStore
     */
    initService(enhancedAxios: any): void {
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

    hydrateData(ssrData: any) {
        Object.assign(this, ssrData);
    }
}
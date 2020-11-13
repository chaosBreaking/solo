import { observable, action, runInAction, computed } from 'mobx';
import CommonStore from '@framework/CommonStore';
import ContentService from './service';
import { hash } from '@utils/crypto';
import { NAVI_ITEMS, SIDE_NAVI_ITEMS } from './constants';

const TABS = {
    NEWS: 0,
    RESOURCE: 1,
    MOD: 2,
    FORMAT: 3,
};

export default class Store extends CommonStore {
    @observable activeTab = TABS.NEWS;
    @observable contentData = [[], [], [], []];
    @observable loadingStatusMap = [0, 0, 0, 0];
    @observable showLoginCard = false;
    @observable mainTabs = [];
    @observable offsetList = {
        [TABS.NEWS]: 0,
        [TABS.RESOURCE]: 0,
        [TABS.MOD]: 0,
        [TABS.FORMAT]: 0,
    };

    contentService;
    count = 20;

    @computed get dataList() {
        return this.contentData[this.activeTab];
    }

    @computed get offset() {
        return this.offsetList[this.activeTab];
    }

    @computed get loadingStatus() {
        return this.loadingStatusMap[this.activeTab];
    }

    get offsetId() {
        return this.dataList.slice(1)?._id;
    }

    @action.bound
    loadDataToCurrentTab = data => {
        this.contentData[this.activeTab] = this.contentData[this.activeTab].concat(data);
        this.offsetList[this.activeTab] += data.length;
    }

    @action.bound
    async initializeData(requestContext) {
        await Promise.all([
            this.initTabs(),
            this.loadDataToCurrentTab(await this.queryData()),
        ]);
        return {};
    }

    initService(axios) {
        this.contentService = new ContentService(axios);
    }

    @action.bound
    async initTabs(options = {}) {
        try {
            // const res = await this.contentService.getTabs() || [];
            // const { data } = res;
            this.mainTabs = this.mainTabs.concat(NAVI_ITEMS);
        } catch (error) {
            return [];
        }
    }

    @action.bound
    async queryData(options = {}) {
        const params = {
            tab: this.activeTab,
            subTab: this.activeSubTab,
            offset: this.offsetList[this.activeTab] || 0,
            offsetId: this.offsetId,
            count: this.count,
            ...options,
        };
        try {
            const res = await this.contentService.getContentData(params);
            return res;
        } catch (error) {
            this.setLoadingStatus(-1);
            return [];
        }
    }

    @action.bound
    setLoadingStatus(status) {
        this.loadingStatusMap[this.activeTab] = status;
    }

    @action.bound
    async loadMore() {
        this.setLoadingStatus(1);
        const data = await this.queryData();
        if (!data.length) {
            return runInAction(() => {
                this.setLoadingStatus(-1);
            });
        }
        runInAction(() => {
            this.loadDataToCurrentTab(data);
            this.setLoadingStatus(0);
        });
    }

    @action.bound
    switchRegistryCardCard(val) {
        this.showRegistryCard = val;
    }

    @action.bound
    switchLoginCard(val) {
        this.showLoginCard = val;
    }

    @action.bound
    setActiveTab(id) {
        this.activeTab = +id;
        this.activeSubTab = 0;
    }

    @action.bound
    setSubActiveTab(id) {
        this.activeSubTab = +id;
        this.loadMore();
    }

    @action.bound
    async login(authData = {}) {
        const { authType, id, passwd } = authData;
        const { success, data = {}, error } = await this.authService.login({
            authType,
            id,
            passwd: hash(passwd)
        });
        if (!success) {
            return { error };
        }
        const { token } = data;
        localStorage.setItem('AccessToken', token);
        return { success };
    }
}

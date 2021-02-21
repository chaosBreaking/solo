import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import { STAGE_MAP } from './constants';
import AuthService from '@framework/common/services/AuthService';
import { setAccessToken } from '@framework/auth';

export default class Store extends CommonStore {
    @observable dataList = [];
    @observable loadingStatus = 0;
    @observable currentStage;

    authService;

    @action.bound
    async initializeData(requestContext) {
        const { query } = requestContext;
        const { state = STAGE_MAP.LOGIN } = query;
        this.currentStage = +state;
        return {};
    }

    initService(axios) {
        this.authService = new AuthService(axios);
    }

    @action.bound
    switchStage(stage) {
        this.currentStage = stage;
    }

    storeToken(token) {
        setAccessToken(token);
    }

    @action.bound
    registerHandler = async formData => {
        try {
            const res = await this.authService.handleRegister(formData);
            if (res.success) {
                const { accessToken } = res;
                this.storeToken(accessToken);
            }
            return res;
        } catch (error) {
            return { success: false, code: error.status };
        }
    }

    @action.bound
    loginHandler = async formData => {
        try {
            const res = await this.authService.handleLogin(formData);
            if (res.success) {
                const { accessToken } = res;
                this.storeToken(accessToken);
            }
            return res;
        } catch (error) {
            return { success: false, code: error.status };
        }
    }
}

import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import { hash } from '@utils/crypto';
import { STAGE_MAP } from './constants';
import AuthService from '@framework/common/services/AuthService';
import { setCookie } from '@utils/cookie';

const HASH_SALT = 'OLOSOLOHASHSAH';

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
        setCookie({
            token
        });
        localStorage.setItem('token', token);
    }

    @action.bound
    registerHandler = async formData => {
        try {
            const { passwd, ...rest } = formData;
            const res = await this.authService.handleRegister({
                ...rest,
                password: hash(formData.passwd, { salt: HASH_SALT }),
            });
            if (res.success) {
                const { accessToken } = res;
                this.storeToken(accessToken);
            }
            return res;
        } catch (error) {
            return { success: false, msg: error.message };
        }
    }

    @action.bound
    loginHandler = async formData => {
        try {
            const { passwd, ...rest } = formData;
            const res = await this.authService.handleLogin({
                ...rest,
                password: hash(formData.passwd, { salt: HASH_SALT }),
            });
            if (res.success) {
                const { accessToken } = res;
                this.storeToken(accessToken);
            }
            return res;
        } catch (error) {
            return { success: false, msg: error.message };
        }
    }
}

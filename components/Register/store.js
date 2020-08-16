import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import RegisterService from './service';
import { hash } from '@utils/crypto';
import { STAGE_MAP } from './constants';
import AuthService from '@framework/common/services/AuthService';

const HASH_SALT = 'OLOSOLOHASHSAH';

export default class Store extends CommonStore {
    @observable dataList = [];
    @observable loadingStatus = 0;
    @observable currentStage = STAGE_MAP.SIGNUP;

    registerService = new RegisterService();
    authService = new AuthService();

    @action.bound
    async initializeData (requestContext) {
        this.dataList = Array.from({ length: 21 }).map((_, index) => ({
            index,
            height: Math.random() + 1
        }));
        return {};
    }

    @action.bound
    switchStage (stage) {
        this.currentStage = stage;
    }

    @action.bound
    registerHandler = async formData => {
        try {
            const res = await this.registerService.newUserRegister({
                ...formData,
                passwd: hash(formData.passwd, { salt: HASH_SALT }),
            });
            return res;
        } catch (error) {
            return { success: false, msg: error.errorMsg };
        }
    }

    @action.bound
    loginHandler = async formData => {
        try {
            const res = await this.authService.handleLogin({
                ...formData,
                passwd: hash(formData.passwd, { salt: HASH_SALT }),
            });
            return res;
        } catch (error) {
            return { success: false, msg: error.errorMsg };
        }
    }
}

import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import RegisterService from './service';
import { hash } from '@utils/crypto';
import { STAGE_MAP } from './constants';

const HASH_SALT = 'OLOSOLOHASHSAH';

export default class Store extends CommonStore {
    @observable dataList = [];
    @observable loadingStatus = 0;
    @observable currentStage = STAGE_MAP.SIGNUP;

    service = new RegisterService();

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
        const res = await this.service.newUserRegister({
            ...formData,
            passwd: hash(formData.passwd, { salt: HASH_SALT }),
        });
        const { data } = res;
        return data;
    }
}

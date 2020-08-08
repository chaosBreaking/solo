import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import RegisterService from './service';
import { hash } from '@utils/crypto';

export default class Store extends CommonStore {
    @observable dataList = [];
    @observable loadingStatus = 0;
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
    registerHandler = async data => {
        const res = await this.service.newUserRegister({
            ...data,
            passwd: hash(data.passwd),
        });
        console.log(res);
        return res;
    }
}

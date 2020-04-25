import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';

export default class Store extends CommonStore {
    @observable stage = 0;
    @observable authType = 0;
    async fetchInitialData (requestContext) {
        return {};
    }

    @action.bound
    nextStage (stage) {
        this.stage = typeof stage === 'number' ? stage : this.stage;
    }

    @action.bound
    changeAuthType (type) {
        this.authType = type;
    }

    @action.bound
    login () {}

    @action.bound
    sign () {}

    @action.bound
    async preAuth () {
        return new Promise((resolve, reject) => setTimeout(() => resolve(2), 500));
    }
}

import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';

export default class Store extends CommonStore {
    @observable stage = 0;
    async fetchInitialData (requestContext) {
        return {};
    }

    @action.bound
    nextStage (stage) {
        this.stage = stage || this.stage;
    }

    @action.bound
    login () {}

    @action.bound
    sign () {}
}

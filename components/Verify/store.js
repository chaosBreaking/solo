import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';

export default class Store extends CommonStore {
    @action.bound
    async initializeData (requestContext) {
        const { query } = requestContext;
        return {};
    }
}

import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import ContentService from './service';

export default class Store extends CommonStore {
    @observable dataList = [];

    constructor (props) {
        super(props);
        this.contentService = new ContentService();
    }

    @action.bound
    async initializeData (requestContext) {
        this.dataList = Array.from({ length: 20 }).map((_, index) => ({
            index,
            height: Math.random() + 1
        }));
        return {};
    }
}

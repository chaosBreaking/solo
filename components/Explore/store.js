import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import ContentService from './service';

export default class Store extends CommonStore {
    constructor (props) {
        super(props);
        this.contentService = new ContentService();
    }

    async initializeData (requestContext) {
        return {};
    }
}

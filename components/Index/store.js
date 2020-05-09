import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import AuthService from './service';
import { isPhoneNumber, isEmail } from '@utils/validate';
import { STAGE_MAP, AUTH_TYPE, BG_IMAGES } from './constants';

export default class Store extends CommonStore {
    @observable showExplore = true;
    constructor (props) {
        super(props);
        this.authService = new AuthService();
    }

    async initializeData (requestContext) {
        this.bgUrl = BG_IMAGES[~~(Math.random() * 10) % 3];
        return { title: 'Solo' };
    }

    async prepareServerData (requestContext) {
        return {};
    }

    async prepareClientData (requestContext) {
        return {};
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
    async preAuth (id) {
        let authType;
        if (isEmail(id)) {
            authType = AUTH_TYPE.EMAIL;
        } else if (isPhoneNumber(id)) {
            authType = AUTH_TYPE.PHONE;
        } else {
            return {
                authType: AUTH_TYPE.ERROR,
            };
        }
        return new Promise((resolve, reject) => setTimeout(() => resolve({
            authType,
            stage: STAGE_MAP.REGISTER
        })));
    }

    @action.bound
    hideExplorer () {
        this.showExplore = false;
    }
}

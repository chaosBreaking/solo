import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import AuthService from './service';
import { isPhoneNumber, isEmail } from '@utils/validate';
import { STAGE_MAP, AUTH_TYPE, BG_IMAGES, ERROR_MAP } from './constants';
import { hash } from '@utils/crypto';

export default class Store extends CommonStore {
    @observable showExplore = true;
    constructor (props) {
        super(props);
        this.authService = new AuthService();
    }

    async initializeData (requestContext) {
        this.bgUrl = BG_IMAGES[~~(Math.random() * 10) % BG_IMAGES.length];
        return { title: 'Solo' };
    }

    async prepareServerData (requestContext) {
        return {};
    }

    async prepareClientData (requestContext) {
        return {};
    }

    @action.bound
    switchExplorer (val) {
        this.showExplore = val;
    }

    @action.bound
    changeAuthType (type) {
        this.authType = type;
    }

    @action.bound
    async preAuth (id) {
        let authType, authKey;
        if (isEmail(id)) {
            authType = AUTH_TYPE.EMAIL;
            authKey = 'email';
        } else if (isPhoneNumber(id)) {
            authType = AUTH_TYPE.PHONE;
            authKey = 'phone';
        } else {
            return {
                authType: AUTH_TYPE.ERROR,
            };
        }
        const { success, data, error } = await this.authService.preAuth({
            authType,
            data: {
                [authKey]: id
            }
        });
        if (!success) {
            return {
                error
            };
        }
        return {
            authType,
            stage: data.isNew ? STAGE_MAP.REGISTER : STAGE_MAP.LOGIN
        };
    }

    @action.bound
    async login (authData = {}) {
        const { authType, id, passwd } = authData;
        const { success, data = {}, error } = await this.authService.login({
            authType,
            id,
            passwd: hash(passwd)
        });
        if (!success) {
            return { error };
        }
        const { token } = data;
        localStorage.setItem('AccessToken', token);
        return { success };
    }
}

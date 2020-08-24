import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import AuthService from './service';
import { isPhoneNumber, isEmail } from '@utils/validate';
import { STAGE_MAP, AUTH_TYPE, BG_IMAGES, ERROR_MAP } from './constants';
import { hash } from '@utils/crypto';

export default class Store extends CommonStore {
    @observable showExplore = true;
    @observable showLoginCard = false;
    @observable showRegistryCard = false;
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
    switchRegistryCardCard (val) {
        this.showRegistryCard = val;
    }

    @action.bound
    switchLoginCard (val) {
        this.showLoginCard = val;
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

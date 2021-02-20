import { observable, action } from 'mobx';
import AuthService from './common/services/AuthService';
import UserService from './common/services/UserService';
import axios from './axios';
import CommonStore from './CommonStore';

const HASH_SALT = 'SHARE_SHARE_SHOP_NEED_SALT!';

const saltPassword = (passwd: string) => passwd + HASH_SALT;

export default class UserStore extends CommonStore {
    @observable token: string = '';
    @observable uid: string = '';
    @observable email: string = '';
    @observable avatar: string = '';
    @observable nickname: string = '';
    @observable refreshing: boolean = false;

    authService: AuthService;
    userService: UserService;

    @action.bound
    async initializeData({ forceLogin }) {
        await this.queryBasicInfo({ forceLogin });
        // const token = await getToken();
        // if (token) {
        // this.dispatchToken(token);
        // }
        // return this;
    }

    @action.bound
    initService(axios) {
        this.authService = new AuthService(axios);
        this.userService = new UserService(axios);
    }

    dispatchToken(token: string) {
        this.token = token;
        axios.defaults.headers.common.token = token;
    }

    @action.bound
    async queryBasicInfo({ forceLogin }) {
        try {
            const {
                uid,
                nickname,
                email,
                avatar,
            } = await this.userService.queryBasicInfo();
            this.uid = uid;
            this.email = email;
            this.nickname = nickname;
            this.avatar = avatar;
        } catch (error) {
            console.error(error);
            if (error && error.code === 403) {
                if (forceLogin) {

                }
            }
        }
    }

    @action.bound
    async refreshInfo() {
        // await this.queryBasicInfo();
    }

    // async clearSessions() {
    //     return Promise.all([deleteKV(['_userInfo']), deleteToken()]);
    // }

    // @action.bound
    // async verifyToken(token: string): Promise<boolean> {
    //     const { success } = await this.authService.verifyToken(token);
    //     return success;
    // }

    // @action.bound
    // async saveBasicInfo({ token, ...rest }: any): Promise<[void, void]> {
    //     return Promise.all([saveToken(token), saveKV('_userInfo', rest)]);
    // }

    @action.bound
    clearState() {
        this.token = '';
        this.uid = '';
        this.email = '';
        this.nickname = '';
    }

    @action.bound
    async logOut() {
        // await this.clearSessions();
        this.clearState();
        console.log('log out...');
    }
}
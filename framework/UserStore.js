import { observable, action } from 'mobx';
import { deleteKV, deleteToken, getToken, saveKV, saveToken } from '@framework/util';
import AuthService from './common/services/AuthService';
import UserService from './common/services/UserService';
import * as Crypto from 'expo-crypto';
import axios from './axios';

const HASH_SALT = 'SHARE_SHARE_SHOP_NEED_SALT!';

const saltPassword = (passwd: string) => passwd + HASH_SALT;

export default class UserStore {
    @observable token: string = '';
    @observable uid: string = '';
    @observable email: string = '';
    @observable nickname: string = '';
    @observable refreshing: boolean = false;

    authService: AuthService = new AuthService({ axios });
    userService: UserService = new UserService({ axios });

    @action.bound
    async init() {
        const token = await getToken();
        if (token) {
            this.dispatchToken(token);
            await this.queryBasicInfo();
        }
        return this;
    }

    dispatchToken(token: string) {
        this.token = token;
        axios.defaults.headers.common.token = token;
    }

    @action.bound
    async queryBasicInfo() {
        console.log('queryBasicInfo');
        try {
            const {
                uid,
                nickname,
                email,
            } = await this.userService.queryBasicInfo();
            this.uid = uid;
            this.email = email;
            this.nickname = nickname;
        } catch (error) {
            console.error(error);
            if (error && error.message === '403') {
                console.warn('Need login');
                await this.clearSessions();
            }
        }
    }

    @action.bound
    async refreshInfo() {
        await this.queryBasicInfo();
    }

    async clearSessions() {
        return Promise.all([deleteKV(['_userInfo']), deleteToken()]);
    }

    @action.bound
    async verifyToken(token: string): Promise<boolean> {
        const { success } = await this.authService.verifyToken(token);
        return success;
    }

    @action.bound
    async saveBasicInfo({ token, ...rest }: any): Promise<[void, void]> {
        return Promise.all([saveToken(token), saveKV('_userInfo', rest)]);
    }

    @action.bound
    clearState() {
        this.token = '';
        this.uid = '';
        this.email = '';
        this.nickname = '';
    }

    @action.bound
    registerHandler = async (formData: any) => {
        try {
            const { name, ...rest } = formData;
            const hashedPasswd = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                saltPassword(formData.passwd)
            );
            const res = await this.authService.handleRegister({
                ...rest,
                nickname: name,
                passwd: hashedPasswd,
            });
            if (res.success) {
                const { email, emailVerified, token, nickname, avatar } = res.data;
                await this.saveBasicInfo({
                    email,
                    emailVerified,
                    token,
                    nickname,
                    avatar,
                });
                this.nickname = nickname;
                this.email = email;
                this.dispatchToken(token);
            }
            return res;
        } catch (error) {
            return { success: false, msg: error.message };
        }
    };

    @action.bound
    loginHandler = async (formData: any) => {
        try {
            // 手动实现加盐
            const hashedPasswd = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                saltPassword(formData.passwd)
            );
            const res = await this.authService.handleLogin({
                ...formData,
                passwd: hashedPasswd,
            });
            if (res.success) {
                const { email, emailVerified, token, nickname, avatar } = res.data;
                await this.saveBasicInfo({
                    email,
                    emailVerified,
                    token,
                    nickname,
                    avatar,
                });
                this.nickname = nickname;
                this.email = email;
                this.dispatchToken(token);
            }
            return res;
        } catch (error) {
            console.error(error);
            return { success: false, msg: error };
        }
    };

    @action.bound
    async logOut() {
        await this.clearSessions();
        this.clearState();
        console.log('log out...');
    }
}

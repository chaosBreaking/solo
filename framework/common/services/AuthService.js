import BaseService from '@framework/BaseService';

const API = {
    PRE_AUTH: '/auth/preauth',
    LOGIN: '/auth/in',
    CODE: '/auth/code',
};

export default class AuthService extends BaseService {
    handlePreAuth = async authData => {
        const res = await this.post(API.PRE_AUTH, { data: authData }).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    handleLogin = async authData => {
        const res = await this.post(API.LOGIN, { data: authData }).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    sendValidateVode = async reqData => {
        const res = await this.post(API.CODE, { data: reqData }).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

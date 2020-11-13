import BaseService from '@framework/BaseService';
import { API_MAP } from '@constants/api';

export default class AuthService extends BaseService {
    handlePreAuth = async authData => {
        const res = await this.post(API_MAP.PRE_AUTH, { data: authData }).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    handleRegister = async formData => {
        const res = await this.post(API_MAP.REGISTER, { data: formData }).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    handleLogin = async authData => {
        const res = await this.post(API_MAP.LOGIN, { data: authData }).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    sendValidateCode = async reqData => {
        const res = await this.post(API_MAP.CODE, { data: reqData }).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

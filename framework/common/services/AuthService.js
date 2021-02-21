import BaseService from '@framework/BaseService';
import { API_MAP } from '@constants/api';

export default class AuthService extends BaseService {
    handlePreAuth = async authData => {
        const res = await this.post(API_MAP.PRE_AUTH, authData).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }

    handleRegister = async formData => {
        const res = await this.post(API_MAP.REGISTER, formData);
        const { data } = res;
        return data;
    }

    handleLogin = async authData => {
        const res = await this.post(API_MAP.LOGIN, authData);
        const { data } = res;
        return data;
    }

    sendValidateCode = async reqData => {
        const res = await this.post(API_MAP.CODE, reqData).catch(error => ({ error }));
        const { data } = res;
        return data;
    }
};

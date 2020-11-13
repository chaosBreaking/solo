import BaseService from '@framework/BaseService';
import { API_MAP } from '@constants/api';

export default class RegisterService extends BaseService {
    newUserRegister = async formData => {
        const res = await this.post(API_MAP.REGISTER, { data: formData }).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

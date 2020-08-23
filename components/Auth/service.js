import BaseService from '@framework/BaseService';

const URLs = {
    REGISTER: 'auth/new',
};

export default class RegisterService extends BaseService {
    newUserRegister = async formData => {
        const res = await this.post(URLs.REGISTER, { data: formData }).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

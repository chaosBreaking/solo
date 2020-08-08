import BaseService from '@framework/BaseService';

const URLs = {
    REGISTER: 'http://localhost:6842/api/auth/new',
};

export default class RegisterService extends BaseService {
    newUserRegister = async data => {
        const res = await this.post(URLs.REGISTER, { data });
        return res;
    }
};

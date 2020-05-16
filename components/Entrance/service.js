import BaseService from '@framework/BaseService';

const API = {
    PRE_AUTH: '/auth/preauth',
    LOGIN: '/auth/in',
    REGISTER: '/auth/regist',
};

export default class AuthService extends BaseService {
    preAuth () {}
};

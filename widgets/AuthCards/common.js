import axios from '@framework/axios';
import AuthService from '@framework/common/services/AuthService';

export const authService = new AuthService(axios);
export const formatPhone = phone => ('' + phone).startsWith('+86-') ? phone : `+86-${phone}`;

export const validateRes = (isValid, msg) => {
    return { isValid, msg };
};
export const CODE_TYPES = {
    REGISTER: 1,
    LOGIN: 2,
    EMAIL_AUTH: 3,
    RESET_PASSWORD: 4,
    RESET_PHONE: 5,
    VERIFY_EMAIL: 6,
};
export const AUTH_TYPE = {
    EMAIL: 0,
    PHONE_PASSWD: 1,
    PHONE_MSG: 2,
    GITHUB: 3,
    GOOGLE: 4,
    FACEBOOK: 5,
};
export const MAX_NICKNAME_LENGTH = 20;
export const MIN_PASSWORD_LENGTH = 6;
export const ERROR_MSGS = {
    NICKNAME_EMPTY: '请输入一个昵称吧~',
    NICKNAME_LENGTH_LIMIT: `昵称最大长度为${MAX_NICKNAME_LENGTH}个字符哦~`,

    EMAIL_EMPTY: '请输入您的邮箱地址哦~',
    EMAIL_INVALID: '请输入一个有效的邮箱地址哦~',

    PHONE_EMPTY: '请输入您的手机号码~',
    PHONE_INVALID: '请输入有效的手机号码~',

    CODE_EMPTY: '请输入验证码',
    CODE_NOT_SENT: '请点击发送验证码',
    CODE_ERROR: '验证码错误，请重试',

    PASSWD_EMPTY: '请设定一个密码吧~',
    PASSWD_REPEAT_EMPTY: '请再输入一次密码哦~',
    PASSWD_NOT_SYNC: '两次输入密码不一致哦~',
    PASSWD_TOO_SHORT: '密码长度至少要6位哦~',
    PASSWD_ERROR: '密码错误，请重新输入',
};

export const defaultRef = () => ({
    getInput: () => { },
    doValidate: () => { },
});

export const getSendCodeBtn = countdown => {
    return !countdown ? '发送验证码' : `重新发送(${countdown})s`;
};

export const validateRes = (isValid, msg) => {
    return { isValid, msg };
};
export const MAX_NICKNAME_LENGTH = 20;
export const MIN_PASSWORD_LENGTH = 6;
export const ERROR_MSGS = {
    NICKNAME_EMPTY: '请输入一个昵称吧~',
    NICKNAME_LENGTH_LIMIT: `昵称最大长度为${MAX_NICKNAME_LENGTH}个字符哦~`,

    EMAIL_EMPTY: '请输入您的邮箱地址哦~',
    EMAIL_INVALID: '请输入一个有效的邮箱地址哦~',

    PASSWD_EMPTY: '请设定一个密码吧~',
    PASSWD_REPEAT_EMPTY: '请再输入一次密码哦~',
    PASSWD_NOT_SYNC: '两次输入密码不一致哦~',
    PASSWD_TOO_SHORT: '密码长度至少要6位哦~',
    PASSWD_ERROR: '密码错误，请重新输入',
};

export const defaultRef = () => ({
    getInput: () => {},
    doValidate: () => {},
});

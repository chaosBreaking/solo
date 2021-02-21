import { getCookieByName, setCookie } from '@utils/cookie';
import { hash } from '@utils/crypto';

const HASH_SALT = 'OLOSOLOHASHSAH';

export const ACCESS_TOKEN_KEY = 'token';

export const formatAuthData = formData => {
    const { passwd, ...rest } = formData;
    return {
        ...rest,
        ...formData.passwd
            ? {
                password: hash(formData.passwd, { salt: HASH_SALT }),
            } : {}
    };
};

export const setAccessToken = token => {
    setCookie({
        [ACCESS_TOKEN_KEY]: token
    });
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return token;
};

export const getAccessToken = () => {
    let token = getCookieByName(ACCESS_TOKEN_KEY);
    if (!token) {
        try {
            token = localStorage.getItem(ACCESS_TOKEN_KEY);
        } catch (error) {
        }
    }
    return token;
};

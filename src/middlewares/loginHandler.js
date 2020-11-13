import axios from '@framework/axios';
import { API_MAP } from '@constants/api';

const COOKIE_KEY_MAP = {
    AccessToken: 'token',
    UID: 'userId',
    UA: 'ua',
};

function getUserAgent(req) {
    return req.get('User-Agent') || req.cookies[COOKIE_KEY_MAP.UA] || '';
}

function clearData(res) {
    res.clearCookie(COOKIE_KEY_MAP.AccessToken);
    res.clearCookie(COOKIE_KEY_MAP.UID);
    res.clearCookie(COOKIE_KEY_MAP.UIN);
}

function setCookie(req, res, key, value) {
    if (value && value !== req.cookies[key]) {
        res.cookie(key, value, { expires: new Date(Date.now() + 8640000000), overwrite: true });
    }
}

function setData(req, res, accessToken, uid) {
    res.locals.token = accessToken;
    setCookie(req, res, COOKIE_KEY_MAP.AccessToken, accessToken);
    setCookie(req, res, COOKIE_KEY_MAP.UID, uid);
}

function redirectLogin(req, res, next) {
    const hostname = req.hostname;
    const url = (req.protocol + '://' + hostname + '/auth.html');
    return res.redirect(url);
}

async function verifyToken(req, res, accessToken) {
    return axios.post(API_MAP.VERIFY_TOKEN, { token: accessToken }).then(({ userId }) => ({ accessToken, userId }));
}

async function fetchAccessTokenAndUid({ req, res }) {
    const accessToken = req.cookies[COOKIE_KEY_MAP.AccessToken];

    if (accessToken) {
        if (!req.forceLogin) {
            return { accessToken };
        } else {
            return verifyToken(req, res, accessToken);
        }
    }

    return {};
}

async function checkLoginStatus(req, res, next) {
    const userAgent = getUserAgent(req);
    const forceLogin = req.forceLogin;
    const { accessToken } = await fetchAccessTokenAndUid({ req, res });

    if (accessToken) {
        setData(req, res, accessToken);
    } else {
        clearData(res);
    }

    if (!accessToken && forceLogin) {
        redirectLogin(req, res, next);
    } else {
        next();
    }
}

export default function loginMiddleware(req, res, next) {
    if (!res.locals.ssr) {
        return next();
    }
    const { route } = res.locals;
    req.forceLogin = route && route.forceLogin;
    checkLoginStatus(req, res, next);
}

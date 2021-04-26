/* eslint-disable no-useless-escape */
const PHONE_VALID_REG = /^\+[0-9]+-[0-9]+\b/;
const URL_PROTOCOL_REG = /^\w+(?=\:\/\/)/;
const URL_HOST_REG = /(?<=\:\/\/)\S+(?=\:)|(?<=\:\/\/)\S+(?=\b)/;
const URL_PORT_REG = /(?<=\:)\d+/;
const PHONE_CN_REG = /^\+86-[1]([3-9])[0-9]{9}$/;
const EMAIL_REG = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

const getFuncProps = fn => {
    const reg = /^(async function|function){1}\s*[^\(]*\(\s*([^\)]*)\)/m;
    return Object.toString.call(fn).match(reg)[2].replace(/ /g, '').split(',').filter(v => v);
};
const getConstructorProps = constructor => {
    const reg = /(?<=constructor\s*\().*(?=\)\s+{)/;
    const res = Object.toString.call(constructor).match(reg);
    return Array.isArray(res) ? res[0].replace(/ /g, '').split(',').filter(v => v) : [];
};

const isEmail = s => EMAIL_REG.test(s);

const isPhoneNumber = n => {
    return PHONE_VALID_REG.test(n);
};
const isPhoneNumberCN = n => {
    return PHONE_CN_REG.test(n);
};
const parseURL = (url, type) => {
    return type === 'protocol'
        ? getProtocol(url)
        : type === 'host'
            ? getHost(url)
            : type === 'port'
                ? getPort(url)
                : '';
};
const getProtocol = url => {
    const res = URL_PROTOCOL_REG.exec(url);
    return Object.prototype.toString.call(res) === '[object Array]' ? res[0] : null;
};
const getHost = url => {
    const res = URL_HOST_REG.exec(url);
    return Object.prototype.toString.call(res) === '[object Array]' ? res[0] : null;
};
const getPort = url => {
    const res = URL_PORT_REG.exec(url);
    return Object.prototype.toString.call(res) === '[object Array]' ? res[0] : null;
};

export {
    getConstructorProps,
    getFuncProps,
    isEmail,
    isPhoneNumber,
    isPhoneNumberCN,
    parseURL,
    getPort,
    getHost,
    getProtocol
};

import crypto from 'crypto';
const DEFAULT_ALGORITHM = 'sha256'; // 默认的哈希算法。could be md5, sha1, sha256, sha512, ripemd160。 可用 Crypto.getHashes/Ciphers/Curves() 查看支持的种类。
const HASHER_LIST = crypto.getHashes();
const DEFAULT_INPUT_ENCODING = 'utf8';

export const hash = (data, option = {}) => {
    // data can be anything, but converts to string or remains be Buffer/TypedArray/DataView
    if (typeof data === 'boolean' || data === Infinity) return null;
    if (typeof data !== 'string' && !(data instanceof Buffer) && !(data instanceof DataView)) { data = JSON.stringify(data); }
    if (option.salt && typeof option.salt === 'string') { data = data + hash(option.salt); }
    const algorithm = HASHER_LIST.indexOf(option.algorithm) >= 0 ? option.algorithm : DEFAULT_ALGORITHM; // 默认为 sha256.
    const inputEncoding = option.inputEncoding || DEFAULT_INPUT_ENCODING; // 'utf8', 'ascii' or 'latin1' for string data, default to utf8 if not specified; ignored for Buffer, TypedArray, or DataView.
    const outputEncoding = option.outputEncoding || 'hex'; // option.output: 留空=》默认输出hex格式；或者手动指定 'buf', hex', 'latin1' or 'base64'
    return crypto.createHash(algorithm).update(data, inputEncoding).digest(outputEncoding);
};

export const createUuid = () => {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';

    return s.join('');
};

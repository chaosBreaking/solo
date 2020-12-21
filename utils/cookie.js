export function getCookies() {
    const data = (document.cookie || '').split('; ');
    const cookies = {};
    for (let i = 0; i < data.length; i++) {
        const index = data[i].indexOf('=');
        const key = data[i].substring(0, index);
        const value = data[i].substring(index + 1);
        if (!cookies[key]) {
            cookies[key] = [];
        }
        cookies[key].push(value);
    }
    return cookies;
}

export function getCookieByName(name) {
    let res = '';
    const cookies = getCookies();
    for (const key in cookies) {
        if (key === name) {
            res = cookies[key][0];
            break;
        }
    }
    return res;
}

export function setCookie(params) {
    const cookies = getCookies();
    for (const key in params) {
        let value = params[key];
        let str = key + '=';
        const exp = new Date();
        if (value) {
            let ttl = 8640000000;
            if (typeof value === 'object') {
                ttl = value.ttl || ttl;
                value = value.value;
            }
            exp.setTime(exp.getTime() + ttl);
            str += value + '; path=/; expires=' + exp.toGMTString();
            document.cookie = str;
        } else {
            exp.setTime(exp.getTime() - 1);
            const expStr = '; path=/; expires=' + exp.toGMTString();
            if (cookies[key]) {
                for (let i = 0; i < cookies[key].length; i++) {
                    document.cookie = str + cookies[key][i] + expStr;
                }
            } else {
                document.cookie = str + expStr;
            }
        }
    }
}

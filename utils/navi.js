export const parseQuery = query => {
    query = query || location.search;
    return query.slice(1).split('&').reduce((acc, s) => {
        const [k, v] = s.split('=');
        // v !== undefined && (acc[k] = v);
        acc[k] = v || true;
        return acc;
    }, {});
};

export const buildQuery = params => {
    if (Object.prototype.toString.call(params) !== '[object Object]') {
        throw new Error('Invalid params type, expected Object');
    }
    return Object.keys(params).reduce((acc, key) => {
        params[key] !== undefined && (acc += `${key}=${params[key]}&`);
        return acc;
    }, '').slice(0, -1);
};

export const forward = (url = '', params) => {
    const { origin } = location;
    let destUrl = origin;
    const oldQuery = parseQuery();
    const query = buildQuery({ ...oldQuery, params });
    url = url[0] === '/' ? url.slice(1) : url;
    url = url ? url.match(/\w+\.html$/g) ? url : `${url}.html` : '';
    destUrl += `/${url}${query ? '?' + query : ''}`;
    location.href = destUrl;
    return 0;
};

export const replacePage = (url = '', params = {}) => {
    if (!history || !history.replaceState) {
        return forward(url, params);
    }
    history.replaceState({ isReplaced: true, ...params }, '', url);
    history.go();
};

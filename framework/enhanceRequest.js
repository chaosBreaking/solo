export default axios => {
    axios.interceptors.request.use(config => {
        return config;
    }, err => {
        console.error(err);
        return Promise.reject(err);
    });

    axios.interceptors.response.use(data => {
        return data;
    }, err => {
        if (err.response) {
            return Promise.reject(err.response);
        }
        err.message = '无网络，请检查网络连接';
        err.code = 400;
        return Promise.reject(err);
    });
};

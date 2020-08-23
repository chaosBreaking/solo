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
            return Promise.reject(new Error({ code: err.response.status, message: err.response.message }));
        }
        err.message = '网络错误';
        err.code = 400;
        return Promise.reject(err);
    });
};

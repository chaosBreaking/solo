import BaseService from '@framework/BaseService';

const URLs = {
    INFO: 'user/basic_info',
};

export default class UserService extends BaseService {
    queryBasicInfo = async () => {
        const res = await this.get(URLs.INFO).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

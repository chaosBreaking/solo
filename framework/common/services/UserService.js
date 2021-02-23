import BaseService from '@framework/BaseService';

const URLs = {
    INFO: 'user/profile',
    UPDATE: 'user/update',
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

    updateProfile = async update => {
        const res = await this.post(URLs.UPDATE, update).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

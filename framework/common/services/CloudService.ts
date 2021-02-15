import BaseService from '@framework/BaseService';

const URLs = {
    TOKEN: 'user/basic_info',
    REQUEST_TOKEN: 'cloud/get_policy',
};

export default class CloudService extends BaseService {
    requestTokenFunc = async () => {
        const res: any = await this.get(URLs.REQUEST_TOKEN).catch(error => ({ error }));
        const { error, data } = res;
        if (error) {
            throw error;
        }
        return data;
    }
};

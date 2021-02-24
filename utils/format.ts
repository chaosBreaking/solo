import dayjs from 'dayjs';

export const formatCreatedAt = (createdAt, serverTime) => {
    const cat = new Date(createdAt);
    const ts = (serverTime - +cat) / 1000 / 3600 / 24 >= 1
        ? dayjs(cat).format('M月D日')
        : (serverTime - +cat) / 1000 / 60 > 1
            ? dayjs(cat).format('H:mm')
            : '刚刚';
    return ts;
};

export const cleanUndefined = obj => {
    for (const i in obj) {
        if (obj[i] === undefined) delete obj[i];
    }
    return obj;
};

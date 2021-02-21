export const formatCreatedAt = (createdAt, serverTime) => {
    const cat = new Date(createdAt);
    const ts = (serverTime - +cat) / 1000 / 3600 / 24 >= 1
        ? cat.toLocaleDateString().replace(/[/|-]/g, '.')
        : (serverTime - +cat) / 1000 / 60 > 1
            ? cat.toLocaleTimeString().split(':').slice(0, -1).join(':')
            : '刚刚';
    return ts;
};

export const cleanUndefined = obj => {
    for (const i in obj) {
        if (obj[i] === undefined) delete obj[i];
    }
    return obj;
};

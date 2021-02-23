import COS from 'cos-js-sdk-v5';

const Bucket = 'solo-1253476624';
const Region = 'ap-shanghai';
/**
 * cos上传
 * @param {*} data
 * @returns
 * {
        Location: 'solo-1253476624.cos.ap-shanghai.myqcloud.com/test',
        statusCode: 200,
        headers: {
            'content-length': '0',
            connection: 'keep-alive',
            date: 'Sat, 24 Oct 2020 18:00:36 GMT',
            etag: '"d41d8cd98f00b204e9800998ecf8427e"',
            server: 'tencent-cos',
            'x-cos-hash-crc64ecma': '0',
            'x-cos-request-id': 'NWY5NDZiYzRfMTc5ZDA4MDlfM2FlXzE2YTRjOGQ='
        },
        ETag: '"d41d8cd98f00b204e9800998ecf8427e"'
    }
*/
function uploader(token) {
    const cos = new COS({
        getAuthorization: async function (options, getFunc) {
            // 异步获取临时密钥
            const { credentials, startTime, expiredTime } = token;
            if (!credentials) return console.error('credentials invalid');
            getFunc({
                TmpSecretId: credentials.tmpSecretId,
                TmpSecretKey: credentials.tmpSecretKey,
                XCosSecurityToken: credentials.sessionToken,
                StartTime: startTime,
                ExpiredTime: expiredTime,
            });
        }
    });
    const upload = data => {
        const { key, file } = data;
        return new Promise((resolve, reject) => {
            cos.putObject({
                Bucket,
                Region,
                StorageClass: 'STANDARD',
                Key: key,
                Body: file, // 上传文件对象
            }, function (err, data) {
                if (err) reject(err);
                const { Location } = data;
                resolve(Location.startsWith('//') ? Location : '//' + Location);
            });
        });
    };

    const validator = type => /^image\/\w{0,4}$/.test(type);

    return (key, file) => {
        if (!validator(file.type)) {
            throw new Error('Invalid type: ' + file.type);
        }
        return upload({ key, file });
    };
};

export default uploader;

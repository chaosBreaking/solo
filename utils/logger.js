export const beaconAction = (apiUrl, params) => {
    // const _params = typeof params === 'string' ? params : Qs.stringify(params);
    // const img = new Image(1, 1);
    // const src = `${apiUrl}?${_params}`;
    // img.src = src;
    // return new Promise((resolve, reject) => {
    //     img.onload = function () {
    //         resolve({ code: 200, data: 'success!' });
    //     };
    //     img.onerror = function (e) {
    //         reject(new Error(e.error));
    //     };
    // });
};

class Logger {
    static getInstance () {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    send (op, params) {

    }

    logEvent (data) {
        const { op, params } = data;
        this.send(op, params);
    }
}

const logger = Logger.getInstance();

export default logger;

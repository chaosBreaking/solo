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

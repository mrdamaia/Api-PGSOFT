import pino from 'pino';

const logger = pino({
    level: 'debug',
    transport: {
        target: "pino-pretty",
        options: {
            levelFirst: true,
            translateTime: 'dd-mm-yyyy HH:mm:ss',
            colorize: true,
        },
    },

})

export default logger;
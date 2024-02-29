import config from './config/config.js';
import { scoreLevel, level } from './config/constants.js';
import * as appenderStrategy from './appenders/appenderStrategy.js'

const logger = (category) => ({
    info: (message) => {
        executeLog(level.INFO, category, message)
    },
    warn: (message) => {
        executeLog(level.WARN, category, message)
    },
    debug: (message) => {
        executeLog(level.DEBUG, category, message);
    },
    trace: (message) => {
        executeLog(level.TRACE, category, message);
    },
    error: (message) => {
        executeLog(level.ERROR, category, message)
    }
});

const appender = appenderStrategy.getAppender();

function executeLog(level, category, message) {
    if (scoreLevel[level] <= config.scoreLevel) {
        appender.log(Date.now(), level, category, message);
    }
}



export default {
    getLogger(category) {
        return logger(category);
    }
};

import * as constants from '../config/constants.js';
import config from '../config/config.js';
import consoleAppender from './console.js'
import fileAppender from './file.js'

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [undefined]:consoleAppender
}

function getAppender(){
    return appenders[config.appender];
}

export {getAppender}

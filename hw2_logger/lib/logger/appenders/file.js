import path from 'path';
import fs from 'fs';

import * as constants from '../config/constants.js';
import config from '../config/config.js';
import formater from './messageFormatter.js';

let { logFilePath } = config

function ensureDirExist(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    fs.mkdirSync(dirname, { recursive: true })
}

function resolveErrorFilePath(logFile, dirName){
    const logFileObj = path.parse(logFile)
    delete logFileObj.base
    logFileObj.name+='_errors'

    return path.format(logFileObj)
}

function log(date, level, category, message, format) {
    let logFileName = path.basename(logFilePath)
    let logDirName = path.dirname(logFilePath)

    ensureDirExist(logDirName)

    if (!path.extname(logFilePath)) { //if folder was specified, not a file
        ensureDirExist(logFilePath)
        logDirName = logFilePath
        logFileName = 'logs.log'
    }

    if (!formater[format]) format = 'plainText'

    const logFile = path.join(logDirName, logFileName)

    const text = formater[format](date, level, category, message)

    if (level === constants.level.ERROR) {
        fs.appendFileSync(resolveErrorFilePath(logFile), text, { encoding: 'utf8', flag: 'a' })
    }

    fs.appendFileSync(logFile, text, 'utf8', { encoding: 'utf8', flag: 'a' })
}

export default { log }

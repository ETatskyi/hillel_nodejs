import * as constants from './constants.js'

export default function (config) {
    for (let key in config) {

        if (!config[key]) {
            delete config[key]
            continue
        }
        if (constants[key]) config[key] = config[key].toString().toUpperCase()
    }

    return config
}
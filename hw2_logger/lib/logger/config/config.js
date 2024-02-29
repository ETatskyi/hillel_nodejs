import * as constants from './constants.js';
import envConfig from './envConfig.js';
import fileConfig from './fileConfig.js'
import defConfig from './defConfig.js';
import makeConfigValid from './makeConfigValid.js';

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

function initConfig() {

    const config = Object.assign(
        makeConfigValid(defConfig),
        makeConfigValid(fileConfig),
        makeConfigValid(envConfig)
    )

    console.log(config)

    enrichConfig(config);

    return config;
}

const config = initConfig();
export default config;

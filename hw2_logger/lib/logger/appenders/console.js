import formater from './messageFormatter.js'

function log(date, level, category, message) {
    console.log(formater.plainText(date, level, category, message));
}

export default {log}

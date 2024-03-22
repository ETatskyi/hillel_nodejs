import Joi from 'joi'
import { dbInsert, dbRead, dbUpdate } from '../simpleDB/manageDB.js'
import genHash from '../utils/utils.js'

export default {
    createUrl: (urlInfo, userInfo) => {
        const validationError = validateUrlError(urlInfo)
        if (validationError) return null

        const payload = {
            code: urlInfo.alias ?? genHash(10),
            name: urlInfo.name,
            url: urlInfo.url,
            visits: 0,
            user: userInfo.id
        }

        return dbInsert('urls', payload)
    },
    getUrl: (code) => {
        const urls = dbRead('urls')
        const urlIndex = urls.findIndex(url => url.code === code)

        if (urlIndex < 0) return null

        urls[urlIndex].visits++
        dbUpdate('urls', urls)

        return urls[urlIndex].url
    }
}

function validateUrlError(data) {
    const urlSchema = Joi.object({
        name: Joi.string()
            .pattern(new RegExp('^[a-zA-Z]{3,30}$'))
            .required(),
        url: Joi.string()
            .required(),
        alias: Joi.string()
            .pattern(new RegExp('^[a-zA-Z]{3,30}$'))
    })

    return urlSchema.validate(data).error
}
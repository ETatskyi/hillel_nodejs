import express from 'express'
import Joi from 'joi'
import { dbInsert, dbRead, dbUpdate } from '../simpleDB/manageDB.js'
import genHash from '../utils/utils.js'

const urlRouter = express.Router()

urlRouter
    .get('/:code', (req, res) => {
        const { code } = req.params
        const urls = dbRead('urls')

        const urlIndex = urls.findIndex(url => url.code === code)
        urls[urlIndex].visits++

        dbUpdate('urls', urls)
        res.status(301).redirect(urls[urlIndex].url)
    })
    .post('/', (req, res) => {
        const validationError = validateUrlError(req.body)
        if (validationError) return res.status(400).send(validationError.details[0].message)

        const payload = {
            code: req.body.alias ?? genHash(10),
            name: req.body.name,
            url: req.body.url,
            visits: 0,
            user: req.user.id
        }

        const code = dbInsert('urls', payload)
        return res.status(200).json(code)
    })

export default urlRouter

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
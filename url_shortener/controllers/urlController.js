import express from 'express'
import urlRepository from '../repository/urlRepository.js'

const urlRouter = express.Router()

urlRouter
    .get('/:code', (req, res) => {
        const url = urlRepository.getUrl(req.params.code)
        return url ? res.status(301).redirect(url) : res.status(404).send("Shortcut not specified")
    })
    .post('/', (req, res) => {
        const code = urlRepository.createUrl(req.body, req.user)
        return code ? res.status(200).json(code) : res.status(400).send(validationError.details[0].message)
    })

export default urlRouter

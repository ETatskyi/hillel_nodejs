import express from 'express'
import Joi from 'joi'
import { dbInsert, dbRead } from '../simpleDB/manageDB.js'

const userRouter = express.Router()

userRouter
    .get('/all', (req, res) => {
        return res.status(200).json(dbRead('users') ?? {})
    })
    .get('/:id', (req, res) => {
        const { id } = req.params

        const user = dbRead('users').find(user => user.id === id)

        return res.status(200).json(user ?? {})
    })
    .post('/', (req, res) => {
        const payload = req.body

        if (!validateNewUserData(payload)) return res.status(400).send('Name and password required')

        const users = dbRead('users')
        if (users.find(u => u.name === payload.name)) return res.status(500).send('User already exists')

        payload.role = req.role ?? 'user'

        const user = dbInsert('users', payload)

        return res.status(200).json({ id: user.id, name: user.name, role: user.role })
    })

export default userRouter


function validateNewUserData(data) {
    const userSchema = Joi.object({
        name: Joi.string()
            .pattern(new RegExp('^[a-zA-Z]{3,20}$'))
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    return !userSchema.validate(data).error
}
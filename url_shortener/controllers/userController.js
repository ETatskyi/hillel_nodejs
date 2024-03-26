import express from 'express'
import userRepository from '../repository/userRepository.js'

const userRouter = express.Router()

userRouter
    .get('/all', (req, res) => {
        return res.status(200).json(userRepository.getAllUserPublicData())
    })
    .get('/:id', (req, res) => {
        return res.status(200).json(userRepository.getUserById(req.params.id) ?? {})
    })
    .post('/', (req, res) => {
        const user = userRepository.createUser(req.body)
        return user.id ? res.status(200).json(user) : res.status(400).send(user.error)
    })

export default userRouter

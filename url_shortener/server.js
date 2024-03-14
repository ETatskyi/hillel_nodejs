import express from 'express'
import createDB from './simpleDB/createDB.js'

import userController from './controllers/userController.js'
import urlController from './controllers/urlController.js'

import authMiddleware from './midlewares/authMiddleware.js'

createDB()
const server = express()

server.use(express.json())
server.use(authMiddleware)

server.use("/user", userController)
server.use("/code", urlController)

export { server }
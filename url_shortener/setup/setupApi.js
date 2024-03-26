import express from 'express'

import { API_ROUTE } from '../constants.js'

import userController from '../controllers/userController.js'
import urlController from '../controllers/urlController.js'

function setupApi(server) {
    const apiRouter = express.Router()
    
    apiRouter.use("/user", userController)
    apiRouter.use("/code", urlController)

    server.use(API_ROUTE, apiRouter)
}

export default setupApi
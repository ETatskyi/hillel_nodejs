import express from 'express'

import authMiddleware from '../midlewares/authMiddleware.js'
import collapseSlash from '../midlewares/collapseSlash.js'

function setupMidlewares(server) {
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }))
    server.use(collapseSlash)
    server.use(authMiddleware)
}

export default setupMidlewares

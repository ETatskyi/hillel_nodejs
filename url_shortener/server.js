import express from 'express'
import createDB from './simpleDB/createDB.js'
import setupApi from './setup/setupApi.js'
import setupViews from './setup/setupViews.js'
import setupMidlewares from './setup/setupMidlewares.js'

createDB()
const server = express()

setupMidlewares(server)
setupApi(server)
setupViews(server)

// server.use((err, req, res, next) => { return res.status(500).send(err.message) })

export { server }
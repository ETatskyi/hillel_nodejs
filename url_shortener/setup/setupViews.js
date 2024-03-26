import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import { API_ROUTE, VIEWS_ROUTE } from '../constants.js'
import urlRepository from '../repository/urlRepository.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const viewsDir = path.resolve(__dirname, "../views")

function setupViews(server) {
    const viewRouter = express.Router()

    viewRouter.use(VIEWS_ROUTE, express.static(viewsDir))

    server.set("views", viewsDir)
    server.set("view engine", "ejs")

    viewRouter.get("/users", (req, res) => { res.render(path.resolve(viewsDir, "users.ejs"), { apiRoute: API_ROUTE }) })
    viewRouter.get("/urls", (req, res) => { res.render(path.resolve(viewsDir, "urls.ejs"), { user: { ...req.user }, urls: urlRepository.getUrlByUserId(req.user?.id) }) })

    server.use(VIEWS_ROUTE, viewRouter)
}

export default setupViews
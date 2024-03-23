import path from 'path'

export const PORT = process.env.PORT || 3000
export const API_ROUTE = process.env.API_ROUTE ||'/'
export const VIEWS_ROUTE = process.env.VIEWS_ROUTE ||'/'

export const dbPath = path.format({ root: '/', dir: 'files', base: 'db.json' })

export const dbTemplate = {
    users: [{ id: 0, name: 'admin', password: 'admin12345', role: 'admin' }],
    urls: []
}
import path from 'path'

export const PORT = process.env.PORT || 5432

export const dbPath = path.format({ root: '/', dir: 'files', base: 'db.json' })

export const dbTemplate = {
    users: [{ id: 0, name: 'admin', password: 'admin12345', role: 'admin' }],
    urls: []
}
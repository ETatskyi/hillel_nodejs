import fs from 'fs'
import { dbPath } from '../constants.js'


export function dbInsert(dbSection, payload) {
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

    if (!Object.keys(dbData).includes(dbSection)) return false

    if (typeof payload !== 'object') payload = { data: payload }

    const newEntity = {
        id: dbData[dbSection].length,
        createdAt: Date.now(),
        ...payload
    }

    dbData[dbSection].push(newEntity)

    fs.writeFileSync(dbPath, JSON.stringify(dbData))

    return newEntity
}

export function dbRead(dbSection) {
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

    if (!Object.keys(dbData).includes(dbSection)) return null

    return dbData[dbSection]
}

export function dbUpdate(dbSection, payload) {
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

    if (!Object.keys(dbData).includes(dbSection)) return false

    dbData[dbSection] = payload

    fs.writeFileSync(dbPath, JSON.stringify(dbData))

    return payload
}
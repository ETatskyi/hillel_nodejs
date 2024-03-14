import fs from 'fs'
import path from 'path'
import { dbPath, dbTemplate } from '../constants.js'

export default function createDB() {
    if (!fs.existsSync(path.dirname(dbPath))) {
        fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    }

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.writeFile(dbPath, JSON.stringify(dbTemplate), (err) => {
                    if (err) {
                        console.error("Error creating DB", err)
                        return
                    }
                    console.log("DB created")
                })
            }
            return
        }

        if (!data) {
            fs.writeFile(dbPath, JSON.stringify(dbTemplate), (err) => {
                if (err) {
                    console.error("DB error", err)
                    return
                }
                console.log("DB created")
            })
        } else {
            console.log("DB is ready for work")
        }
    })
}
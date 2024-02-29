import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

let fileConfig = {}

try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    
    const logFilePath = path.resolve(__dirname, '../../../logger.json')

    const file = fs.openSync(process.env.LOG_CONFIG_FILE ?? logFilePath, 'r')

    fileConfig = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }))

    fs.closeSync(file)
} catch (e) {
    console.log('Config file opening error:', e)
}

export default fileConfig


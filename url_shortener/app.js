import { server } from './server.js'
import { PORT } from './constants.js'

server.listen(PORT,() => {
    console.log(`App listening on port ${PORT}`)
})
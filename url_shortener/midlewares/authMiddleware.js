import { dbRead } from '../simpleDB/manageDB.js'

export default (req, res, next) => {
    const auth = req.header("Authorization");
    if (auth?.startsWith("Basic ")) {
        const [name, password] = auth.substring(6, auth.length).split(":")

        const users = dbRead('users')

        const user = users?.find(u => u.name === name)
        // console.log(user, name, password)
        if (user.password === password) {
            req.user = user

            next()
            return true
        }

        res.status(401).end("Authorization failed")
        return false
    }

    res.status(401).end("Authorization was not provided")
    return false
}

import Joi from 'joi'
import { dbInsert, dbRead, dbUpdate } from '../simpleDB/manageDB.js'
import genHash from '../utils/utils.js'

export default {
    getAllUserPublicData: () => {
        return dbRead('users').map(user => ({ id: user.id, name: user.name })) ?? []
    },
    getUserById: (id) => {
        return dbRead('users').find(user => user.id == id)
    },
    createUser: (payload, role) => {
        const validationError = validateNewUserError(payload)
        if (validationError) return { error: validationError.message}

        const users = dbRead('users')
        if (users.find(u => u.name === payload.name)) return { error: 'User already exists'}

        payload.role = role ?? 'user'

        const user = dbInsert('users', payload)

        return { id: user.id, name: user.name, role: user.role }
    },
}

function validateNewUserError(data) {
    const userSchema = Joi.object({
        name: Joi.string()
            .pattern(new RegExp('^[a-zA-Z]{3,20}$'))
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    })

    return userSchema.validate(data).error
}

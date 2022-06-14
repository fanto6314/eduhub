const bcrypt = require("bcryptjs");

export function hashPassword(value) {
    return bcrypt.hashSync(value, 10)
}

export function verifyPassword(value, hash) {
    return bcrypt.compareSync(value, hash)
}

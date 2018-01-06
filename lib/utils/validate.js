const colors = require('colors')

exports.email = function (email) {
    const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return pattern.test(email)
}

const createError = function (msg) {
    const err = new Error()
    err.message = msg
    throw err
}

exports.userDetails = function (user) {
    if (!exports.email(user.email)) {
        return Promise.reject('Invalid email address')
    }
    if (user.password !== user.rpassword) {
        return Promise.reject('Provided passwords do not match')
    }
    return Promise.resolve({ email: user.email, password: user.password })
}

exports.logout = function (logout) {
    logout = logout.toLowerCase()
    const correct = /(^y$|^n$|^yes$|^no$)/gi.test(logout)
    if (!correct) {
        console.log('Please response y/n'.bold.red)
    }
    return correct
}
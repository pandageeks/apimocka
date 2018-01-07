const validate = require('../utils/validate')
const axios = require('axios')
const qs = require('qs')
const store = require('../utils/store')
const colors = require('colors')
const config = require('../config')
const catchHandler = require('../utils/catchHandler')
const logger = require('../utils/logger')

const createUser = function (user) {
    return axios.post(config.server + '/register', qs.stringify(user))
}

const successfulRegistration = function (res) {
    const message = res.data.message
    return logger.log(message + '. Run '.green + 'apimocka login'.bold.green + ' to get started'.green)
}

module.exports = function (user) {
    if (!user || !user.email || !user.password) {
        return Promise.reject('Please specify account information')
    }
    return validate.userDetails(user)
        .then(createUser)
        .then(successfulRegistration)
}
const prompt = require('inquirer').prompt
const axios = require('axios')
const qs = require('qs')
const store = require('../utils/store')
const colors = require('colors')
const config = require('../config')
const logger = require('../utils/logger')

const authUser = function (user) {
    return axios.post(config.server + '/login', qs.stringify(user))
}

const saveAuthToken = function (res) {
    const token = res.data.data.token
    const message = res.data.message
    store.set(config.storeKeys.token, token)
    return logger.log(message.green)
}

module.exports = function (user) {
    if (!user || !user.email || !user.password) {
        return Promise.reject('Please provide your login details')
    }
    return authUser(user).then(saveAuthToken)
}
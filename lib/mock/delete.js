const axios = require('axios')
const store = require('../utils/store')
const colors = require('colors')
const config = require('../config')
const fs = require('fs')
const formData = require('form-data')
const ajax = require('../utils/ajax')
const logger = require('../utils/logger')

const fileExists = function (file) {
    try {
        fs.statSync(file)
    } catch (err) {
        return false
    }
    return true
}

const successful = function (res) {
    logger.log(('⛔️  ' + res.data.message).green)
}

module.exports = function (id) {
    if (!id) {
        return Promise.reject('Please specify a project id'.red)
    }
    const token = store.get(config.storeKeys.token)
    if (!token) {
        return Promise.reject(config.messages.authError)
    }
    const headers = ajax.createHeaders(token)
    return axios.delete(config.server + '/api/mock/' + id, { headers: headers }).then(successful)

}
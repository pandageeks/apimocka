const axios = require('axios')
const qs = require('qs')
const store = require('../utils/store')
const colors = require('colors')
const config = require('../config')
const fs = require('fs')
const formData = require('form-data')
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
    logger.log('Mock created'.bold.green)
    logger.log(('👉🏽  ' + config.api + '/' + res.data.url).green)
    if (!res.data.premium) {
        return logger.log('NOTE: Without a premium account, your mock requests will be throttled'.bold.italic.red)
    }
    return
}

module.exports = function (file) {
    if (!file) {
        return Promise.reject('Please specify a configuration file'.red)
    }
    if (!fileExists(file)) {
        return Promise.reject('File does not exist'.red)
    }
    const token = store.get(config.storeKeys.token)
    if (!token) {
        return Promise.reject(config.messages.authError)
    }
    const form = new formData()
    const headers = form.getHeaders()
    headers['Authorization'] = 'Bearer ' + token
    form.append('configFile', fs.createReadStream(file))
    return axios.post(config.server +'/api/mock', form, { headers: headers }).then(successful)

}
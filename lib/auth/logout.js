const prompt = require('inquirer').prompt
const validate = require('../utils/validate')
const axios = require('axios')
const qs = require('qs')
const store = require('../utils/store')
const colors = require('colors')
const config = require('../config')
const logger = require('../utils/logger')

module.exports = function (response) {

    if (!response || !response.logout) {
        return Promise.reject('Provide a logout response'.red)
    }

    const logout = response.logout
    if (logout === 'y' || logout === 'yes') {
        store.delete(config.storeKeys.token)
        logger.log('Successfully logged out!')
    }
    return Promise.resolve(true)
}
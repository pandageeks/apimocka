const axios = require('axios')
const store = require('../utils/store')
const colors = require('colors')
const config = require('../config')
const formData = require('form-data')
const Table = require('../utils/customTTable')
const ajax = require('../utils/ajax')
const logger = require('../utils/logger')

const displayMocks = function (res) {
    const table = Table()
    const mocks = res.data.mocks
    if (mocks.length < 1) {
        return Promise.reject(config.messages.noMock)
    }
    table.push(["Name".bold, "id".bold])    // push table headers
    table.push.apply(table, mocks)
    logger.log('' + table)
    return
}

module.exports = function () {
    const token = store.get(config.storeKeys.token)
    if (!token) {
        return Promise.reject(config.messages.authError)
    }

    const headers = ajax.createHeaders(token)
    return axios.get(config.server + '/api/mock', { headers: headers }).then(displayMocks)
}
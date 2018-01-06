const colors = require('colors')
const logger = require('./logger')

module.exports = function (err) {
    var message
    var data = []
    if (typeof err === 'string') {
        message = err
    } else if (err.response) {
        message = err.response.data.message
        data = err.response.data.data || []
    } else if (err.request) {
        message = err.request
    } else if (err.message) {
        message = err.message
    } else {
        message = 'Connection to server lost, please try again'
    }
    logger.log(message.red)
    if (data.length > 0) {
        data.map(function (i) {
            logger.log(('=> '+i).red)
        })
    }
}
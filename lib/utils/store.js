const Configstore = require('configstore')
const config = require('../config')

const store = new Configstore(config.name)

module.exports = store
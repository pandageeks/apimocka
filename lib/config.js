const colors = require('colors')

module.exports = {
    server: 'https://api.apimocka.com',
    api: 'https://mockd.co',
    name: 'apimocka',
    storeKeys: {
        token: 'token'
    },
    messages: {
        authError: 'Not logged in. Please run '.red + 'apimocka login'.bold.red,
        noMock: 'You do not have any mocks. Please run ' + 'mock deploy [configFile]'.bold
    }
}
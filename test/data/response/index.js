const deploy = require('./deploy')
const deleteData = require('./delete')
const list = require('./list')
const login = require('./login')
const logout = require('./logout')

module.exports = {
    deploy,
    deleteData,
    list,
    login,
    logout
}
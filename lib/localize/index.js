const prompt = require('inquirer').prompt
const axios = require('axios')
const store = require('../utils/store')
const config = require('../config')
const catchHandler = require('../utils/catchHandler')
const serve = require('./server')

// TODO: Add debug question and feature to localized mocks
const questions = [
    {
        type: 'input',
        name: 'id',
        message: 'Project id:'
    },
    {
        type: 'input',
        name: 'port',
        message: 'Local Port:',
        default: 8080
    }
]

const handleLocalization = function (input) {
    if (!!!input.id) return console.log('Please specify a mock id for localization'.red)
    return axios.get(config.api + '/' + input.id + '/localize')
        .then(function (res) {
            const routes = res.data.data
            console.log('-----')
            console.log('🙌🏾  Project routes found'.green)
            return serve(routes, input)
        })
}

module.exports = function () {
    // if (id.length < 5) return console.log('This project does not exist'.red)
    return prompt(questions)
        .then(handleLocalization)
        .catch(catchHandler)
}
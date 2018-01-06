#!/usr/bin/env node

const program = require('commander')
const prompt = require('inquirer').prompt

const questions = require('./questions')
const register = require('./auth/register')
const login = require('./auth/login')
const logout = require('./auth/logout')
const list = require('./mock/list')
const deploy = require('./mock/deploy')
const deleteMock = require('./mock/delete')
const localizeMock = require('./localize')
const catchHandler = require('./utils/catchHandler')

program
    .version('0.9.0')
    .description('Mock API in seconds from your terminal')

program
    .command('register')
    .description('Create a new APImocka account')
    .action(function () {
        return prompt(questions.registerQuestions).then(register)
    })

program
    .command('login')
    .description('Generate access token for existing APImocka account')
    .action(function () {
        return prompt(questions.loginQuestions)
            .then(login)
            .catch(catchHandler)
    })

program
    .command('logout')
    .description('Logout from current APImocka account')
    .action(function () {
        return prompt(questions.logoutQuestions)
            .then(logout)
            .catch(catchHandler)
    })

program
    .command('list')
    .description('Show all your mocks')
    .action(function () {
        return list().catch(catchHandler)
    })

program
    .command('deploy [configFile]')
    .description('Create a new mock from config file')
    .action(function (configFile) {
        return deploy(configFile).catch(catchHandler)
    })

program
    .command('delete [mockId]')
    .description('Delete a mock')
    .action(function (id) {
        return deleteMock(id).catch(catchHandler)
    })

program
    .command('localize [mockId]')
    .description('Localize a mock')
    .action(localizeMock)

if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}

program.parse(process.argv)
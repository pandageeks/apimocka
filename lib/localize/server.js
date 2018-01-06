const express = require('express')
const colors = require('colors/safe')
const parseURL = require('../utils/parseURL')
const _ = require('lodash')

const routesHandler = function (routes) {
    const routeKeys = Object.keys(routes)
    return function (req, res) {
        const path = req.path
        if (path === '/') return res.json({ status: 'active', routes: routeKeys })
        const splitPath = parseURL(req.path)
        const routeName = splitPath[0]
        const id = splitPath[1]
        const route = routes[routeName]
        if (!route) return res.status(404).json({ error: true, message: 'Route not found' })
        if (!id) return res.json({ success: true, data: route })
        var _id;
        try {
            _id = parseInt(id)
        } catch (err) {
            return res.status(404).json({ error: true, message: 'Invalid id' })
        }
        const content = _.find(route, { "_id" : _id })
        return (content) ? res.json({ success: true, data: content }) : res.json({ error: true, message: 'Id not found' })
    }
}

module.exports = function (routes, input) {
    const app = express()
    app.all('**/*', routesHandler(routes))
    app.listen(input.port, function () {
        console.log('-----')
        console.log(colors.green('🎉  Started local🏡  server with mock data on port ' + input.port))
        console.log('-----')
        console.log(('👉🏽  http://localhost:' + input.port).green)
    })
}
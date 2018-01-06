const list = require('../../lib/mock/list')
const config = require('../../lib/config')
const chai = require('chai')
const asPromised = require('chai-as-promised')
const nock = require('nock')
const response = require('../data/response')
const colors = require('colors')
const store = require('../../lib/utils/store')
const logger = require('../../lib/utils/logger')

const sinon = require('sinon')

/* Setup chai */
chai.use(asPromised)
chai.should()
const expect = chai.expect
const assert = chai.assert

describe('APImocka: list', function () {

    var sandbox
    var oldToken

    before(function () {
        sandbox = sinon.sandbox.create()
        sandbox.stub(logger, 'log')
        oldToken = store.get(config.storeKeys.token)
    })

    beforeEach(function () {
        nock(config.server)
            .get('/api/mock')
            .reply(200, response.list)
    })


    after(function () {
        (oldToken) ? store.set(config.storeKeys.token, oldToken) : store.delete(config.storeKeys.token)
        sandbox.restore()
    })

    describe('With authentication', function () {

        beforeEach(function () {
            store.set(config.storeKeys.token, 'sampleToken')
        })

        it('should pass', function (done) {
            list().should.be.fulfilled.and.notify(done)
        })
    })

    describe('without authentication', function () {

        beforeEach(function () {
            store.delete(config.storeKeys.token)
        })

        it('should fail', function (done) {
            list().should.be.rejected.and.notify(done)
        })
    })
})
const deploy = require('../../lib/mock/deploy')
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

describe('APImocka: deploy', function () {

    var sandbox
    var oldToken

    before(function () {
        sandbox = sinon.sandbox.create()
        sandbox.stub(logger, 'log')
        oldToken = store.get(config.storeKeys.token)
    })

    beforeEach(function () {
        store.set(config.storeKeys.token, 'sampleToken')
        nock(config.server)
            .post('/api/mock')
            .reply(200, response.deploy)
    })

    afterEach(function () {
        (oldToken) ? store.set(config.storeKeys.token, oldToken) : store.delete(config.storeKeys.token)
        sandbox.restore()
    })

    describe('With config file', function () {
        it('should complete', function (done) {
            deploy('./test/data/sample/trial.json').should.be.fulfilled.and.notify(done)
        })
    })

    describe('without config file', function () {
        it ('should fail', function (done) {
            deploy().should.be.rejected.and.notify(done)
        })
    })
})
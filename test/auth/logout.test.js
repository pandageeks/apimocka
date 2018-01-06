const logout = require('../../lib/auth/logout')
const config = require('../../lib/config')
const chai = require('chai')
const asPromised = require('chai-as-promised')
const sinon = require('sinon')
const store = require('../../lib/utils/store')
const response = require('../data/response')
const logger = require('../../lib/utils/logger')

/* Setup chai */
chai.use(asPromised)
chai.should()
const expect = chai.expect

describe('APImocka: logout', function () {

    var sandbox
    var oldToken

    const logoutToken = 'logoutTrialToken'

    before(function () {
        sandbox = sinon.sandbox.create()
        sandbox.stub(logger, 'log')
        oldToken = store.get(config.storeKeys.token)
    })

    beforeEach(function () {
        store.set(config.storeKeys.token, logoutToken)
    })

    after(function () {
        (oldToken) ? store.set(config.storeKeys.token, oldToken) : store.delete(config.storeKeys.token)
        sandbox.restore()
    })

    describe('Logout with No', function () {
        it ('should be ignored', function (done) {
            logout(response.logout.no).should.eventually.equal(true).notify(done)
            expect(store.get(config.storeKeys.token)).to.equal(logoutToken)
        })
    })

    describe('Logout with Yes', function () {
        it ('should logged out', function (done) {
            logout(response.logout.yes).should.eventually.equal(true).notify(done)
            expect(store.get(config.storeKeys.token)).to.equal(undefined)
        })
    })
})
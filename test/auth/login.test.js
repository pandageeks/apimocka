const login = require('../../lib/auth/login')
const config = require('../../lib/config')
const chai = require('chai')
const asPromised = require('chai-as-promised')
const nock = require('nock')
const response = require('../data/response')
const user = require('../data/sample/user')
const sinon = require('sinon')
const colors = require('colors')
const store = require('../../lib/utils/store')
const logger = require('../../lib/utils/logger')

/* Setup chai */
chai.use(asPromised)
chai.should()
const expect = chai.expect

describe('APImocka: login', function () {

    var sandbox
    var oldToken

    before(function () {
        sandbox = sinon.sandbox.create()
        sandbox.stub(logger, 'log')
        oldToken = store.get(config.storeKeys.token)
        nock(config.server)
            .post('/login', user)
            .reply(200, response.login)
    })

    beforeEach(function () {
        store.delete(config.storeKeys.token)
    })

    after(function () {
        (oldToken) ? store.set(config.storeKeys.token, oldToken) : store.delete(config.storeKeys.token)
        sandbox.restore()
    })

    describe('with user', function () {
        it('should pass & save token', function () {
            login(user).then(function () {
                expect(store.get(config.storeKeys.token)).to.equal(response.login.data.token)
            })
        })
    })

    describe('Without user', function () {
        it('should fail', function (done) {
            login().should.be.rejected.and.notify(done)
            expect(store.get(config.storeKeys.token)).to.equal(undefined)
        })
    })
})
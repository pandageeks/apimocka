const deleteMock = require('../../lib/mock/delete')
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

describe('APImocka: delete', function () {

    var sandbox
    var oldToken

    const mockId = 'abc12345'

    const responseData = response.deleteData
    responseData.data.id = mockId

    before(function () {
        sandbox = sinon.sandbox.create()
        sandbox.stub(logger, 'log')
        oldToken = store.get(config.storeKeys.token)
    })

    beforeEach(function () {
        store.set(config.storeKeys.token, 'sampleToken')
        nock(config.server)
            .delete('/api/mock/' + mockId)
            .reply(200, responseData)
    })

    after(function () {
        (oldToken) ? store.set(config.storeKeys.token, oldToken) : store.delete(config.storeKeys.token)
        sandbox.restore()
    })

    describe('With mock id', function () {
        it('should complete', function (done) {
            deleteMock(mockId).should.be.fulfilled.and.notify(done)
        })
    })

    describe('without mock id', function () {
        it ('should fail', function (done) {
            deleteMock().should.be.rejected.and.notify(done)
        })
    })

    describe('without authentication', function () {

        beforeEach(function () {
            store.delete(config.storeKeys.token)
        })

        it('should fail', function (done) {
            deleteMock(mockId).should.be.rejected.and.notify(done)
        })
    })
})
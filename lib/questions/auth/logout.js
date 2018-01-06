const validate = require('../../utils/validate')

module.exports = [
    {
        name: 'logout',
        message: 'Are you sure (Y/N)? ',
        validate: validate.logout
    }
]
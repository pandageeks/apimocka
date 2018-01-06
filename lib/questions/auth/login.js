const validate = require('../../utils/validate')

module.exports = [
    {
        // type: 'input',
        name: 'email',
        message: 'Email:',
        validate: validate.email
    },
    {
        type: 'password',
        name: 'password',
        message: 'Password:'
    }
]
exports.createHeaders = function (token) {
    const headers = {}
    headers['Authorization'] = 'Bearer ' + token
    headers['Content-Type'] = 'application/json'

    return headers
}
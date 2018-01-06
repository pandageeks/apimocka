module.exports = function (path) {
    return path.replace(/^(\/)/g, '').replace(/(\/)$/g, '').split('/')
}
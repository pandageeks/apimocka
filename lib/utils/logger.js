/*
    Thanks to: Gyandeep Singh
    https://gyandeeps.com/console-stubbing/
*/

module.exports = {
    log: function() {
        console.log.apply(console, arguments)
    }
}
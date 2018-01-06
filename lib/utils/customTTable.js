const Table = require('terminal-table')

module.exports = function () {
    return new Table({
        width: ["50%", "50%"],
        horizontalLine: true,
        leftPadding: 1
    });
}
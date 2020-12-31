const fs = require('fs')

module.exports = {
    readFile: (filename) => {
        return JSON.parse(fs.readFileSync(filename))
    },
    writeFile: (filename, data) => {
        fs.writeFileSync(filename, JSON.stringify(data, null, 4))
    }
}
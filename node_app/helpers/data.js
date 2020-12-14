const fs = require('fs')

module.exports = {
    readFile: (filename) => {
        return JSON.parse(fs.readFileSync(`./data/${filename}.json`))[filename]
    },
    writeFile: (filename, data) => {
        fs.writeFileSync(`./data/${filename}.json`, JSON.stringify({ data }))
    }
}
const fs = require('fs')
exports.createDebugFile = (body, fileName) => {
    fs.writeFile(fileName, JSON.stringify(body, null, 2), (err) => {
        if (err) {
            console.log('error in file write', err)
        }
    })
}

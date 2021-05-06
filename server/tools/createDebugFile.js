const { writeFile } = require('fs/promises')
//const fs = require('fs')
const { queryFilePaths } = require('../statics')

// NOTE THAT THIS IS MESSING WITH THE ROUTE RESPONSE SENDS
// Should be fixed if properly changed to async / promises
exports.createDebugFile = async (body, fileName) => {
    let logFilePath =
        process.env.NODE_ENV !== 'production'
            ? queryFilePaths.development
            : queryFilePaths.production
    logFilePath = `${logFilePath}/${fileName}`
    // fs.writeFile(logFilePath, JSON.stringify(body, null, 2), (err) => {
    //     if (err) {
    //         console.log('error in file write', err)
    //     }
    // })
    await writeFile(logFilePath, JSON.stringify(body, null, 2))
}

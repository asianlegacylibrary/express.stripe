const { kindfulInstance } = require('../../../connection')

module.exports = {
    getKindfulWithPromise(options) {
        return kindfulInstance(options)
            .then((result) => {
                return result.data
            })
            .catch((error) => {
                //console.error(error)
                return Promise.reject(error)
            })
        //
    },
    async getKindful(options) {
        let result = await kindfulInstance(options)
        return result.data
    }
}

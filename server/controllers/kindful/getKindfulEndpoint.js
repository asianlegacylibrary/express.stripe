const { kindfulInstance } = require('../../../connection')

module.exports = {
    async getKindfulEndpoint(endpoint) {
        let options = {
            url: endpoint,
            method: 'GET'
        }

        try {
            console.log('here in the get axios')
            const resp = await kindfulInstance(options)
            console.log('post axios await')
            return resp.data
        } catch (err) {
            // Handle Error Here
            console.error(err)
        }
    },
    getKindfulWithPromise(endpoint) {
        let options = {
            url: endpoint,
            method: 'GET'
        }
        console.log('kindful with promise but how?')
        kindfulInstance(options)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                console.log('FUUUUUUUUUK!')
            })
        //
    }
}

const express = require('express')
const { kindfulEndpoints } = require('../../statics')
const { getKindfulWithPromise, getKindful } = require('./getKindfulEndpoint')
const { parseKindfulData } = require('../../tools/parse/parseKindfulData')

const router = express.Router()

router.get('/', async (request, response) => {
    let k = request.query.type ? request.query.type : null
    console.log(request.query)
    if (!k) {
        response.send('required parameter missing')
    }
    let options = {
        url: kindfulEndpoints[k].path,
        method: kindfulEndpoints[k].method
    }
    let data = []
    try {
        data = await getKindful(options)

        data = parseKindfulData(data)
    } catch (error) {
        console.error('error', error)
        data = error
    } finally {
        console.log('Finished request...')
    }
    console.log(data)
    response.send(data)
    //
    // console.log(data)
    // response.send(data)
    // getKindfulWithPromise(options)
    //     .then((data) => {
    //         let newArray = parseKindfulData(data)
    //         response.send(newArray)
    //     })
    //     .catch((e) => {
    //         console.error('error', e)
    //         response.send(e)
    //     })
    //     .then(() => {
    //         console.log('Finished request...')
    //     })
})

module.exports = router

const express = require('express')
const { getKindfulEndpoint } = require('./getKindfulEndpoint')
const { kindfulEndpoints } = require('../../statics')
const { getKindfulWithPromise } = require('./getKindfulEndpoint')
const router = express.Router()

router.get('/', async (_, res) => {
    //let campaigns = await getKindfulEndpoint(kindfulEndpoints['funds'])
    await getKindfulWithPromise(kindfulEndpoints['funds'])
    res.send({ meow: 'hi' })
})

module.exports = router

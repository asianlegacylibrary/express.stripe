const express = require('express')
const { getData } = require('./getData')
const router = express.Router()

router.get('/', (request, response) => {
    console.log(request.query)
    let sql = ''
    let table = request.query.tbl ? request.query.tbl : null
    let limit = request.query.limit ? request.query.limit : 10
    if (request.query.list === 'true') {
        sql =
            'SELECT table_name FROM information_schema.tables WHERE table_schema = "digital_library"'
    } else {
        sql = `SELECT * FROM ${table} LIMIT ${limit}`
    }

    getData(sql)
        .then((data) => {
            response.json(data)
            //response.send(peeps)
        })
        .catch((e) => {
            console.error('error', e)
            response.send(e)
        })
        .then(() => {
            console.log('Finished request...')
        })
})

module.exports = router

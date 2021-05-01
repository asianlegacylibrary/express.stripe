const { Client } = require('@elastic/elasticsearch')
const axios = require('axios')

const client = new Client({
    cloud: {
        id: process.env.ES_CLOUD_ID,
    },
    auth: {
        username: process.env.ES_CLOUD_USER,
        password: process.env.ES_CLOUD_PASSWORD,
    },
})

const kindfulInstance = axios.create({
    baseURL: 'https://api.kindful.com',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${process.env.KINDFUL_APP_TOKEN}`,
    },
})

// CONNECT TO MYSQL DATABASE EXAMPLE -------------------------------------
// const { getData } = require('./server/controllers/stripe/getMySQLdata')

// const people = getData('SELECT * FROM personstbl')
// //console.log(meow)
// people.then((result) => {
//     console.log(result)
// })

module.exports = {
    client,
    kindfulInstance,
}

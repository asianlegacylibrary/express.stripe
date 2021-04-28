// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

const express = require('express')
const routeStripe = require('./controllers/routeStripeWebhook')
const { getData } = require('./controllers/getData')

// Initialize...like a boss
const server = express()

server.use(express.raw({ type: 'application/json' }))
server.use(
    express.urlencoded({
        extended: true
    })
)

server.use('/stripe', routeStripe)

console.log(process.env.NODE_ENV)

const people = getData('SELECT * FROM personstbl')
//console.log(meow)
people.then((result) => {
    console.log(result)
})

module.exports = server

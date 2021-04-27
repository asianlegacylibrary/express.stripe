// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

const express = require('express')
const routeStripe = require('./controllers/routeStripeWebhook')

// Initialize...
const server = express()

server.use(express.raw({ type: 'application/json' }))
server.use(
    express.urlencoded({
        extended: true
    })
)

server.use('/stripe', routeStripe)

console.log(process.env.NODE_ENV)

module.exports = server

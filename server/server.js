// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

const express = require('express')
const routeStripe = require('./controllers/stripe/routeStripeWebhook')
const routeMysql = require('./controllers/mysql/routeMysql')
const routeKindful = require('./controllers/kindful/routeKindful')

// Initialize...like a boss
const server = express()

//server.use('/stripe', express.raw({ type: 'application/json' }))
//server.use(express.json())
server.use(
    express.urlencoded({
        extended: true
    })
)

server.use('/stripe', express.raw({ type: 'application/json' }), routeStripe)
server.use('/mysql', routeMysql)
server.use('/kindful', routeKindful)

console.log(process.env.NODE_ENV)

module.exports = server

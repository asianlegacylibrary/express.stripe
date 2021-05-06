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

// SET THE ROUTES, optional middleware, and route controller
// Stripe - this route listens for stripe webhook and processes to elastic (and next to kindful)
server.use('/stripe', express.raw({ type: 'application/json' }), routeStripe)

// MySQL - this route is exploratory, we're just viewing table data from MySQL
server.use('/mysql', routeMysql)

// Kindful - also exploratory, just outputting the kindful metadata (funds, campaigns, details)
server.use('/kindful', routeKindful)

module.exports = server

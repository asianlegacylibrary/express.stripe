const express = require('express')
const stripe = require('stripe')

const { createDebugFile } = require('../../tools/createDebugFile')
const { flatten } = require('../../tools/json/flatten')
const { parseForKindful } = require('../../tools/kindful/parseForKindful')
const { putStripeRecord } = require('../../models/stripe/putStripeRecord')

const router = express.Router()

let endpointSecret = process.env.STRIPE_SIGNATURE
let logFilePath = '/home/joel/logs'
//let endpointSecret = process.env.STRIPE_LIVE_TESTING_SIGNATURE

if (process.env.NODE_ENV !== 'production') {
    endpointSecret = process.env.STRIPE_DEVELOPMENT
    logFilePath = './server/log'
}

let stripeEvents = [
    'payment_intent.succeeded',
    'charge.succeeded',
    'invoice.paid'
]

router.post('/', async (request, response) => {
    const sig = request.headers['stripe-signature']
    let event

    try {
        event = await stripe.webhooks.constructEvent(
            request.body,
            sig,
            endpointSecret
        )
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (stripeEvents.includes(event.type)) {
        let paymentIntent = flatten(event.data.object)
        const { body } = await putStripeRecord(
            paymentIntent,
            `f1_stripe_${event.type}`
        )

        console.log('elastic resp body', body)
        if (event.type === 'payment_intent.succeeded') {
            const kindfulData = parseForKindful(event.data.object)
            createDebugFile(
                kindfulData,
                `${logFilePath}/kindful_${event.type}.json`
            )
            console.log('in payment intent success')
        }

        // these files just for debugging
        createDebugFile(
            event.data.object,
            `${logFilePath}/event_${event.type}.json`
        )
        createDebugFile(paymentIntent, `${logFilePath}/flat_${event.type}.json`)
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true })
})

module.exports = router

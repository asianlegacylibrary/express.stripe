const express = require('express')
const stripe = require('stripe')
const { createDebugFile } = require('../tools/createDebugFile')
const router = express.Router()

const endpointSecret = process.env.STRIPE_DEVELOPMENT

router.post('/', (request, response) => {
    const sig = request.headers['stripe-signature']

    let event

    try {
        event = stripe.webhooks.constructEvent(
            request.body,
            sig,
            endpointSecret
        )
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object
            createDebugFile(
                paymentIntent,
                `./server/log/event_${event.type}.json`
            )
            console.log('PaymentIntent was successful MEOWYYZZ!')
            break
        case 'payment_method.attached':
            const paymentMethod = event.data.object
            console.log('PaymentMethod was attached to a Customer!')
            break
        // ... handle other event types
        case 'charge.succeeded':
            const charge = event.data.object
            if (process.env.NODE_ENV !== 'production') {
                createDebugFile(charge, `./server/log/event_${event.type}.json`)
            }
            console.log('charge')
            break
        default:
            createDebugFile(
                event.data.object,
                `./server/log/event_${event.type}.json`
            )
            console.log(`Unhandled event type ${event.type}`)
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true })
})

module.exports = router

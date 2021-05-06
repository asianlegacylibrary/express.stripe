const express = require('express')
const stripe = require('stripe')

const { createDebugFile } = require('../../tools/createDebugFile')
const { flatten } = require('../../tools/flatten')
const { parseForKindful } = require('../../tools/parseForKindful')
const { putStripeRecord } = require('../../models/stripe/putStripeRecord')
const {
    getKindfulWithPromise,
    getKindful
} = require('../../models/kindful/getKindfulEndpoint')
const { kindfulEndpoints } = require('../../statics')

const router = express.Router()

let endpointSecret = process.env.STRIPE_SIGNATURE
//let endpointSecret = process.env.STRIPE_LIVE_TESTING_SIGNATURE

if (process.env.NODE_ENV !== 'production') {
    endpointSecret = process.env.STRIPE_DEVELOPMENT
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
        console.log('response from elastic', body)

        if (event.type === 'payment_intent.succeeded') {
            const kindfulData = parseForKindful(event.data.object)
            //await createDebugFile(kindfulData, `kindful_${event.type}3333.json`)
            console.log('in payment intent success', kindfulData)
            let options = {
                url: kindfulEndpoints['imports'].path,
                method: kindfulEndpoints['imports'].method,
                body: request.body,
                data: kindfulData,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token token=${process.env.KINDFUL_APP_TOKEN}`
                }
            }
            //let data = await getKindful(options)

            getKindfulWithPromise(options)
                .then((data) => {
                    console.log(data)
                    //response.send(data.status)
                })
                .catch((e) => {
                    console.error('error', e)
                    //response.send(e)
                    //response.end(e)
                })
                .then(() => {
                    console.log('Finished request...')
                })
        }

        // these files just for debugging
        //createDebugFile(event.data.object, `event_${event.type}.json`)
        //createDebugFile(paymentIntent, `flat_${event.type}.json`)
    }

    // AT ANY POINT IN THE ROUTE I SHOULD BE ABLE TO MAKE A CALL TO ANOTHER ENDPOINT

    // Return a response to acknowledge receipt of the event
    response.json({ received: true })
})

module.exports = router

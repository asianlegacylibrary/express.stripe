require('dotenv').config()
const server = require('./server/server')
let port = process.env.STRIPE_PORT
//port = 4242

server
    .listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
    .on('error', (error) => {
        console.log(
            error,
            'Logging error to console. This is a nodemon error that recently started when I accidentally used yarn'
        )
    })

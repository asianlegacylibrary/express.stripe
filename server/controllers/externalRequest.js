const http = require('http')

let requestOptions = {
    hostname: 'app.kindful.com', // url or ip address
    //port: 8080, // default to 80 if not provided
    path: '/api/v1/imports',
    method: 'POST', // HTTP Method
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${process.env.KINDFUL_APP_TOKEN}`,
    },
}

let externalRequest = (requestOptions, externalResponse) => {
    http.request(requestOptions, (externalResponse) => {
        console.log('here in externalRequest', externalRequest)
        // ServerB done responding
        externalResponse.on('end', () => {
            // Response to client

            console.log('hello? does this work?')

            //response.end('data was send to serverB')
        })
        externalResponse.on('error', () => {
            console.log('error? but what??!')
        })
    })

    externalRequest.on('error', (e) => {
        console.error(`problem with request: ${e.message}`)
    })

    // SEND DATA
    externalRequest.write(JSON.stringify(kindfulData))
    externalRequest.end()
}

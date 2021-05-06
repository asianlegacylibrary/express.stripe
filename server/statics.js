module.exports = {
    kindfulEndpoints: {
        campaigns: {
            path: '/api/v1/campaigns',
            method: 'GET'
        },
        funds: {
            path: '/api/v1/funds',
            method: 'GET'
        },
        details: {
            path: '/api/v1/details',
            method: 'GET'
        },
        imports: {
            path: '/api/v1/imports',
            method: 'POST'
        }
    },
    queryFilePaths: {
        production: '/home/joel/logs',
        development: './server/logs'
    }
}

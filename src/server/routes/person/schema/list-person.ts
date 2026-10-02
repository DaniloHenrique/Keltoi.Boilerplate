export default {
    querystring: {
        type: 'object',
        properties: {
            number: {
                type: 'number'
            },
            size: {
                type: 'number'
            }
        },
        required: ['number', 'size']
    }
}
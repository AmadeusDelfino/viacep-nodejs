const axios = require('axios').default
const api = axios.create({
    baseURL: 'http://viacep.com.br/ws/',
    timeout: 4000
})

const getCep = (cep) => {
    return () => {
        return api.get(cep + '/json')
    }
}

module.exports = {
    get: async (request, response) => {
        const result = await api.get(request.query.cep + '/json')
        response.json(result.data)
    },
    multcep: (request, response) => {
        const ceps = request.query.ceps.split(',')
        const functions = ceps.map(cep => {
            return getCep(cep)()
        })
        Promise.all(functions)
            .then(results => {
                const resultToFront = results.map(cep => cep.data)
                console.log(resultToFront)
                response.json(resultToFront)
            })
    }
}
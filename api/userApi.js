const axios = require('axios')
const { userApiURL } = require('../config.json')

const userApi = axios.create({
    baseURL: userApiURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

module.exports = userApi
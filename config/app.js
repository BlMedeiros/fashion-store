require('dotenv').config

const apiConfig = {
    apiUrl: process.env.API_URL,
}

if(!apiUrl) {
    throw new Error("URL da api não configurada")
}
const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../Utils/parseStringAsArray')

module.exports = {
    // Buscar todos devs bun raio 10km
    // Filtrar por tecnologias
    async index(request, response) {
        
        const { latitude, longitude, techs } = request.query

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                }
            }
        })

        return response.json({ devs })
    }
}
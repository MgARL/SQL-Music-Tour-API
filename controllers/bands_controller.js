const bands = require('express').Router()
const db = require('../models')
const { Band, meet_greet, Event, set_time, stage } = db
const { Op } = require('sequelize')

// Find all bands
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})
// Find specific Band
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include:[
                {
                    model: meet_greet,
                    as: 'meet_greets',
                    order: [['meet_greet_id','ASC']],
                    attributes: ['meet_greet_id', 'meet_start_time','meet_end_time'],
                    include: {
                        model: Event, 
                        as: "event",
                        where: {
                            name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}
                        }
                    }
                },{
                    model: set_time,
                    as: "set_times",
                    attributes: ['set_time_id','start_time', 'end_time'],
                    include: [
                       {
                           model: Event,
                           as: "event",
                           where: {
                               name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}
                           }
                       },{
                        model: stage,
                        as: "stage"
                       } 
                    ]
                }
            ] 
        })
        if (foundBand) {
            res.status(200).json(foundBand)
        }
        else {
            res.status(404).json({
                message: "Band not Found"
            })
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

// Create a Band
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(201).json(newBand)
    } catch (error) {
        res.status(500).json(error)
    }
})
// Update Band
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})
// delete band
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = bands
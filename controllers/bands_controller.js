const bands = require('express').Router()
const db = require('../models')
const band = require('../models/band')
const { Band } = db
const { Op } = require('sequelize')

// Find all bands
bands.get('/', async (req, res) =>{
    try {
        const foundBands = await Band.findAll({
            order: [ ['available_start_time', 'ASC'] ],
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : '' }%`}
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})
// Find specific Band
bands.get('/:id', async (req,res) => {
    try {
        const foundBand = await Band.findOne({
            where: {band_id: req.params.id }
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Create a Band
bands.post('/', async (req,res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(201).json(newBand)
    } catch (error) {
        res.status(500).json(error)
    }
})
// Update Band
bands.put('/:id', async (req,res) => {
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
bands.delete('/:id', async (req, res) =>{
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
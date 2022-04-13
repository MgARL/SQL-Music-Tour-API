const stages = require('express').Router()
const db = require('../models')
const { stage } = db
const { Op } = require('sequelize')

// find all stages
stages.get('/', async (req, res) => {
    try {
        const foundStages = await stage.findAll({
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

// find specific stage
stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await stage.findOne({
            where: {
                stage_id: req.params.id
            }
        })
        if (foundStage) {
            res.status(200).json(foundStage)
        } else {
            res.status(404).json({
                message: "Stage not Found"
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// create stage
stages.post('/', async (req, res) => {
    try {
        const newStage = await stage.create(req.body)
        res.status(200).json(newStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

// update stage
stages.put('/:id', async (req, res) => {
    try {
        const updatedStage = await stage.update(req.body,{
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStage} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete stage
stages.delete('/:id', async (req,res) => {
    try {
        const deletedStage = await stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStage} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = stages;
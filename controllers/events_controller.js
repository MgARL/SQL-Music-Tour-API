const events = require('express').Router()
const db = require('../models')
const event = require('../models/event')
const { Event } = db
const { Op, json } = require('sequelize')

// Find all events
events.get('/', async (req , res) =>{
    const foundEvents = await Event.findAll()
    res.status(200).json(foundEvents)
})

// Find Specific Event
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: {event_id: req.params.id}
        })
        if(foundEvent){
            res.status(200).json(foundEvent)
        }
        res.status(404).json({
            message: "Event not Found"
        })
    } catch (error) {
        res.status(500),json(error)
    }
})
// Create Event
events.post('/', async (req,res) => {
    try {
        console.log(req.body)
        const newEvent = await Event.create(req.body)
        res.status(201).json(newEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})
    // Cols of event table: (name,date,start_time,end_time)

// Update Event
events.put('/:id', async (req, res) =>{
    try {
        const updatedEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvent} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete Event
events.delete('/:id', async (req, res) =>{
    try {
        const deletedEvent  = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvent} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = events
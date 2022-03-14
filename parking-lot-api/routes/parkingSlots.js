const express = require('express')
const router = express.Router()
const { getParkingSlots, getParkingSlot, createParkingSlot, updateParkingSlot, deleteParkingSlot } = require('../controllers/parkingSlotController')

// Fetch All
router.get('/', async (req, res) => {
    try {
        getParkingSlots(req, res)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Fetch
router.get('/:id', (req, res) => {
    getParkingSlot(req, res, req.params.id)
})

// Create
router.post('/', async (req, res) => {
    try {
        createParkingSlot(req, res)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Update
router.put('/:id', async (req, res) => {
    try {
        updateParkingSlot(req, res, req.params.id)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete
router.delete('/:id', async (req, res) => {
    try {
        deleteParkingSlot(req, res, req.params.id)
        res.json({ message: 'Parking Slot Removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router

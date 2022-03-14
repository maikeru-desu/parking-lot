const express = require('express')
const router = express.Router()
const { getParkingEntries, getParkingEntry, createParkingEntry, updateParkingEntry, deleteParkingEntry } = require('../controllers/parkingEntryController')

// Fetch All
router.get('/', async (req, res) => {
    try {
        getParkingEntries(req, res)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Fetch
router.get('/:id', (req, res) => {
    getParkingEntry(req, res, req.params.id)
})

// Create
router.post('/', async (req, res) => {
    try {
        createParkingEntry(req, res)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Update
router.put('/:id', async (req, res) => {
    try {
        updateParkingEntry(req, res, req.params.id)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete
router.delete('/:id', async (req, res) => {
    try {
        deleteParkingEntry(req, res, req.params.id)
        res.json({ message: 'Parking Entry Removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router

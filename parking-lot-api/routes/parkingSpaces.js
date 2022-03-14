const express = require('express')
const router = express.Router()
const { getParkingSpaces, getParkingSpace, createParkingSpace, updateParkingSpace, deleteParkingSpace } = require('../controllers/parkingSpaceController')

// Fetch All
router.get('/', async (req, res) => {
    try {
        getParkingSpaces(req, res)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Fetch
router.get('/:id', (req, res) => {
    getParkingSpace(req, res, req.params.id)
})

// Create
router.post('/', async (req, res) => {
    try {
        createParkingSpace(req, res)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Update
router.put('/:id', async (req, res) => {
    try {
        updateParkingSpace(req, res, req.params.id)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete
router.delete('/:id', async (req, res) => {
    try {
        deleteParkingSpace(req, res, req.params.id)
        res.json({ message: 'Parking Space Removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router

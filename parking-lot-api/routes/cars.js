const express = require('express')
const router = express.Router()
const { getCars, getCar, createCar, updateCar, deleteCar, park, unpark } = require('../controllers/carController')

// Fetch All
router.get('/', async (req, res) => {
    try {
        getCars(req, res)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Fetch
router.get('/:id', (req, res) => {
    getCar(req, res, req.params.id)
})

// Create
router.post('/', async (req, res) => {
    try {
        createCar(req, res)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Update
router.put('/:id', async (req, res) => {
    try {
        updateCar(req, res, req.params.id)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete
router.delete('/:id', async (req, res) => {
    try {
        deleteCar(req, res, req.params.id)
        res.json({ message: 'Car Removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Update
router.post('/:id/park', async (req, res) => {
    try {
        park(req, res, req.params.id)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update
router.post('/:id/unpark', async (req, res) => {
    try {
        unpark(req, res, req.params.id)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


module.exports = router

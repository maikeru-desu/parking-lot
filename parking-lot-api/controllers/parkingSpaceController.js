const ParkingSpace = require('../models/parkingSpaceModel')

// @desc    Gets All ParkingSpaces
// @route   GET /api/parkingSpaces
async function getParkingSpaces(req, res) {
    try {
        const parkingSpaces = await ParkingSpace.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(parkingSpaces))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single ParkingSpace
// @route   GET /api/parkingSpace/:id
async function getParkingSpace(req, res, id) {
    try {
        const parkingSpace = await ParkingSpace.findById(id)

        if(!parkingSpace) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'ParkingSpace Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(parkingSpace))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a ParkingSpace
// @route   POST /api/parkingSpaces
async function createParkingSpace(req, res) {
    try {
        const { parking_space_id } = req.body

        const parkingSpace = {
            parking_space_id,
            "car_id": null
        }

        const newParkingSpace = await ParkingSpace.create(parkingSpace)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newParkingSpace))  

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a ParkingSpace
// @route   PUT /api/parkingSpaces/:id
async function updateParkingSpace(req, res, id) {
    try {
        const parkingSpace = await ParkingSpace.findById(id)

        if(!parkingSpace) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'ParkingSpace Not Found' }))
        } else {
            const { parking_space_id, car_id } = req.body

            const parkingSpaceData = {
                parking_space_id: parking_space_id || parkingSpace.parking_space_id,
                car_id: car_id
            }

            const updatedParkingSpace = await ParkingSpace.update(id, parkingSpaceData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updatedParkingSpace)) 
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete ParkingSpace
// @route   DELETE /api/parkingSpace/:id
async function deleteParkingSpace(req, res, id) {
    try {
        const parkingSpace = await ParkingSpace.findById(id)

        if(!parkingSpace) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'ParkingSpace Not Found' }))
        } else {
            await ParkingSpace.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `ParkingSpace ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getParkingSpaces,
    getParkingSpace,
    createParkingSpace,
    updateParkingSpace,
    deleteParkingSpace
}
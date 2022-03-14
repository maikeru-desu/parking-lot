const ParkingSlot = require('../models/parkingSlotModel')

// @desc    Gets All ParkingSlots
// @route   GET /api/parkingSlots
async function getParkingSlots(req, res) {
    try {
        const parkingSlots = await ParkingSlot.findAll()

        let chunked = []
        let size = 4;

        Array.from({length: Math.ceil(parkingSlots.length / size)}, (val, i) => {
        chunked.push(parkingSlots.slice(i * size, i * size + size))
        })

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(chunked))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single ParkingSlot
// @route   GET /api/parkingSlot/:id
async function getParkingSlot(req, res, id) {
    try {
        const parkingSlot = await ParkingSlot.findById(id)

        if(!parkingSlot) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'ParkingSlot Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(parkingSlot))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a ParkingSlot
// @route   POST /api/parkingSlots
async function createParkingSlot(req, res) {
    try {
        const { parking_space_id } = req.body

        const parkingSlot = {
            parking_space_id,
            "car_id": null
        }

        const newParkingSlot = await ParkingSlot.create(parkingSlot)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newParkingSlot))  

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a ParkingSlot
// @route   PUT /api/parkingSlots/:id
async function updateParkingSlot(req, res, id) {
    try {
        const parkingSlot = await ParkingSlot.findById(id)

        if(!parkingSlot) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'ParkingSlot Not Found' }))
        } else {
            const { parking_space_id, car_id } = req.body

            const parkingSlotData = {
                parking_space_id: parking_space_id || parkingSlot.parking_space_id,
                car_id: car_id
            }

            const updatedParkingSlot = await ParkingSlot.update(id, parkingSlotData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updatedParkingSlot)) 
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete ParkingSlot
// @route   DELETE /api/parkingSlot/:id
async function deleteParkingSlot(req, res, id) {
    try {
        const parkingSlot = await ParkingSlot.findById(id)

        if(!parkingSlot) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'ParkingSlot Not Found' }))
        } else {
            await ParkingSlot.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `ParkingSlot ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getParkingSlots,
    getParkingSlot,
    createParkingSlot,
    updateParkingSlot,
    deleteParkingSlot
}
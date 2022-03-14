const ParkingEntry = require('../models/parkingEntryModel')

// @desc    Gets All ParkingEntries
// @route   GET /api/parkingEntries
async function getParkingEntries(req, res) {
    try {
        const parkingEntries = await ParkingEntry.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(parkingEntries))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single ParkingEntry
// @route   GET /api/parkingEntry/:id
async function getParkingEntry(req, res, id) {
    try {
        const parkingEntry = await ParkingEntry.findById(id)

        if(!parkingEntry) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'ParkingEntry Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(parkingEntry))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a ParkingEntry
// @route   POST /api/parkingEntries
async function createParkingEntry(req, res) {
    try {
        const { parking_space_id } = req.body

        const parkingEntry = {
            parking_space_id
        }

        const newParkingEntry = await ParkingEntry.create(parkingEntry)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newParkingEntry))  

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a ParkingEntry
// @route   PUT /api/parkingEntries/:id
async function updateParkingEntry(req, res, id) {
    try {
        const parkingEntry = await ParkingEntry.findById(id)

        if(!parkingEntry) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'ParkingEntry Not Found' }))
        } else {
            const { parking_space_id } = req.body

            const parkingEntryData = {
                parking_space_id: parking_space_id || parkingEntry.parking_space_id,
            }

            const updatedParkingEntry = await ParkingEntry.update(id, parkingEntryData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updatedParkingEntry)) 
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete ParkingEntry
// @route   DELETE /api/parkingEntry/:id
async function deleteParkingEntry(req, res, id) {
    try {
        const parkingEntry = await ParkingEntry.findById(id)

        if(!parkingEntry) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'ParkingEntry Not Found' }))
        } else {
            await ParkingEntry.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `ParkingEntry ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getParkingEntries,
    getParkingEntry,
    createParkingEntry,
    updateParkingEntry,
    deleteParkingEntry
}
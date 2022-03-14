let parkingEntries = require('../data/parkingEntries')
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(parkingEntries)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const parkingEntry = parkingEntries.find((p) => p.id === id)
        resolve(parkingEntry)
    })
}

function create(parkingEntry) {
    return new Promise((resolve, reject) => {
        const newParkingEntry = {id: uuidv4(), ...parkingEntry}
        parkingEntries.push(newParkingEntry)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/parkingEntries.json', parkingEntries);
        }
        resolve(newParkingEntry)
    })
}

function update(id, parkingEntry) {
    return new Promise((resolve, reject) => {
        const index = parkingEntries.findIndex((p) => p.id === id)
        parkingEntries[index] = {id, ...parkingEntry}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/parkingEntries.json', parkingEntries);
        }
        resolve(parkingEntries[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        parkingEntries = parkingEntries.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/parkingEntries.json', parkingEntries);
        }
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
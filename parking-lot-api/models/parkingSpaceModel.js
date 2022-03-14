let parkingSpaces = require('../data/parkingSpaces')
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(parkingSpaces)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const parkingSpace = parkingSpaces.find((p) => p.id === id)
        resolve(parkingSpace)
    })
}

function create(parkingSpace) {
    return new Promise((resolve, reject) => {
        const newParkingSpace = {id: uuidv4(), ...parkingSpace}
        parkingSpaces.push(newParkingSpace)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/parkingSpaces.json', parkingSpaces);
        }
        resolve(newParkingSpace)
    })
}

function update(id, parkingSpace) {
    return new Promise((resolve, reject) => {
        const index = parkingSpaces.findIndex((p) => p.id === id)
        parkingSpaces[index] = {id, ...parkingSpace}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/parkingSpaces.json', parkingSpaces);
        }
        resolve(parkingSpaces[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        parkingSpaces = parkingSpaces.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/parkingSpaces.json', parkingSpaces);
        }
        resolve()
    })
}

function findByType(type) {
    return new Promise((resolve, reject) => {
        const results = parkingSpaces.find((p) => p.type == type)
        resolve(results)
    })
}


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    findByType
}
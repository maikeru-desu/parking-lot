let parkingSlots = require('../data/parkingSlots')
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(parkingSlots)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const parkingSlot = parkingSlots.find((p) => p.id === id)
        resolve(parkingSlot)
    })
}

function create(parkingSlot) {
    return new Promise((resolve, reject) => {
        const newParkingSlot = {id: uuidv4(), ...parkingSlot}
        parkingSlots.push(newParkingSlot)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/parkingSlots.json', parkingSlots);
        }
        resolve(newParkingSlot)
    })
}

function update(id, parkingSlot) {
    return new Promise((resolve, reject) => {
        const index = parkingSlots.findIndex((p) => p.id === id)
        parkingSlots[index] = {id, ...parkingSlot}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/parkingSlots.json', parkingSlots);
        }
        resolve(parkingSlots[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        parkingSlots = parkingSlots.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/parkingSlots.json', parkingSlots);
        }
        resolve()
    })
}

function findByType(type) {
    return new Promise((resolve, reject) => {
        if (type == 'LARGE') {
            resolve(parkingSlots.filter((p) => p.type === 'LARGE'))
        } else if (type == 'MEDIUM') {
            resolve(parkingSlots.filter((p) => p.type === 'LARGE' || p.type === 'MEDIUM'))
        } else {
            resolve(parkingSlots.filter((p) => p.type === 'LARGE' || p.type === 'MEDIUM' || p.type === 'SMALL'))
        }
    })
}

function findByCarId(id) {
    return new Promise((resolve, reject) => {
        resolve(parkingSlots.filter((p) => p.car_id === parseInt(id)))
    })
}

function findByIdAndType(id, type) {
    return new Promise((resolve, reject) => {
        const parkingSlot = parkingSlots.filter(p => p.id == id && p.type == type)
        resolve(parkingSlot)
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    findByType,
    findByCarId,
    findByIdAndType
}
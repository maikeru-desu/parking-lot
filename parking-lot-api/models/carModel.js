let cars = require('../data/cars')
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(cars)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const car = cars.find((p) => p.id === id)
        resolve(car)
    })
}

function create(car) {
    return new Promise((resolve, reject) => {
        const newCar = {id: uuidv4(), ...car}
        cars.push(newCar)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/cars.json', cars);
        }
        resolve(newCar)
    })
}

function update(id, car) {
    return new Promise((resolve, reject) => {
        const index = cars.findIndex((p) => p.id === id)
        cars[index] = {id, ...car}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/cars.json', cars);
        }
        resolve(cars[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        cars = cars.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/cars.json', cars);
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
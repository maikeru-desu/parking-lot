const Car = require('../models/carModel')
const ParkingSlot = require('../models/parkingSlotModel')
const ParkingSpace = require('../models/parkingSpaceModel')
const carTypes = require('../enums/carTypes');
const carService = require('../services/carService')
const moment = require('moment');

// @desc    Gets All Cars
// @route   GET /api/cars
async function getCars(req, res) {
    try {
        const cars = await Car.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(cars))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single Car
// @route   GET /api/car/:id
async function getCar(req, res, id) {
    try {
        const car = await Car.findById(id)

        if(!car) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Car Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(car))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Car
// @route   POST /api/cars
async function createCar(req, res) {
    try {
        const { plate_number, type } = req.body

        const car = {
            plate_number,
            type,
            "park_in": null,
            "park_out": null
        }

        const newCar = await Car.create(car)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newCar))  

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a Car
// @route   PUT /api/cars/:id
async function updateCar(req, res, id) {
    try {
        const car = await Car.findById(id)

        if(!car) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Car Not Found' }))
        } else {
            const { plate_number, type } = req.body

            const carData = {
                plate_number: plate_number || car.plate_number,
                type: type || car.type,
                "park_in": null,
                "park_out": null
            }

            const updatedCar = await Car.update(id, carData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updatedCar)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete Car
// @route   DELETE /api/car/:id
async function deleteCar(req, res, id) {
    try {
        const car = await Car.findById(id)

        if(!car) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Car Not Found' }))
        } else {
            await Car.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Car ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Park a Car
// @route   POST /api/cars/:id
async function park(req, res, id) {
    try {
        const car = await Car.findById(id)

        if(!car) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Car Not Found' }))
        } else {
            const availableParkingSlots = await ParkingSlot.findByType(car.type);

            if (availableParkingSlots.length === 0) {
                return res.end(JSON.stringify({ message: 'No Available Slot' }))
            }

            const entryPoint = req.body.entry_point;

            if (!["1", "2", "3"].includes(entryPoint)) {
                return res.end(JSON.stringify({ message: 'Wrong Entry Point' }))
            }

            const parkingSlotIds = [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 16],
            ];

            let parkingSlotId;

            let carTypeObjects; 

            if (car.type == carTypes.medium) {
                carTypeObjects = {
                    medium: "MEDIUM",
                    large: "LARGE"
                }
            } else if (car.type == carTypes.large) {
                carTypeObjects = {
                    large: "LARGE"
                }
            } else {
                carTypeObjects = {
                    small: "SMALL",
                    medium: "MEDIUM",
                    large: "LARGE"
                }
            }

        
            if (entryPoint == 1) {
                for (const [key, value] of Object.entries(carTypeObjects)) {
                    for (let i = 0; i < 4; i++) {
                        if (i % 2 == 0) {
                            for (let j = 0; j < 4; j++) {
                                const parkingSlot = await ParkingSlot.findByIdAndType(parkingSlotIds[i][j].toString(), value)
                                if (parkingSlot.length > 0 && parkingSlot.car_id == null) {
                                    parkingSlotId = carService.getParkingSlotId(parkingSlot[0], car);
                                    if (parkingSlotId > 0) {
                                        break;
                                    }
                                }
                            }
                        } else {
                            for (let j = 4 - 1; j >= 0; j--) {
                                const parkingSlot = await ParkingSlot.findByIdAndType(parkingSlotIds[i][j].toString(), value)
                                if (parkingSlot.length > 0 && parkingSlot.car_id == null) {
                                    parkingSlotId = carService.getParkingSlotId(parkingSlot[0], car);
                                    if (parkingSlotId > 0) {
                                        break;
                                    }
                                }
                            }
                        }
    
                        if (parkingSlotId > 0) {
                            break;
                        }
                    }
                    
                    if (parkingSlotId >  0) {
                        break;
                    }
                }
            } else if (entryPoint == 2) {
                for (const [key, value] of Object.entries(carTypeObjects)) {
                    for (let i = 0; i < 4; i++) {
                        if (i % 2 != 0) {
                            for (let j = 0; j < 4; j++) {
                                const parkingSlot = await ParkingSlot.findByIdAndType(parkingSlotIds[i][j].toString(), value)
                                if (parkingSlot.length > 0 && parkingSlot.car_id == null) {
                                    parkingSlotId = carService.getParkingSlotId(parkingSlot[0], car);
                                    if (parkingSlotId > 0) {
                                        break;
                                    }
                                }
                            }
                        } else {
                            for (let j = 4 - 1; j >= 0; j--) {
                                const parkingSlot = await ParkingSlot.findByIdAndType(parkingSlotIds[i][j].toString(), value)
                                if (parkingSlot.length > 0 && parkingSlot.car_id == null) {
                                    parkingSlotId = carService.getParkingSlotId(parkingSlot[0], car);
                                    if (parkingSlotId > 0) {
                                        break;
                                    }
                                }
                            }
                        }
    
                        if (parkingSlotId > 0) {
                            break;
                        }
                    }
                    
                    if (parkingSlotId >  0) {
                        break;
                    }
                }
            } else if (entryPoint == 3) {
                for (const [key, value] of Object.entries(carTypeObjects)) {
                    for (let i = 4 - 1; i >= 0; i--) {
                        if (i % 2 != 0) {
                            for (let j = 4 - 1; j >= 0; j--) {
                                const parkingSlot = await ParkingSlot.findByIdAndType(parkingSlotIds[i][j].toString(), value)
                                if (parkingSlot.length > 0 && parkingSlot.car_id == null) {
                                    parkingSlotId = carService.getParkingSlotId(parkingSlot[0], car);
                                    if (parkingSlotId > 0) {
                                        break;
                                    }
                                }
                            }
                        } else {
                            for (let j = 0; j < 4; j++) {
                                const parkingSlot = await ParkingSlot.findByIdAndType(parkingSlotIds[i][j].toString(), value)
                                if (parkingSlot.length > 0 && parkingSlot.car_id == null) {
                                    parkingSlotId = carService.getParkingSlotId(parkingSlot[0], car);
                                    if (parkingSlotId > 0) {
                                        break;
                                    }
                                }
                            }
                        }
    
                        if (parkingSlotId > 0) {
                            break;
                        }
                    }

                    if (parkingSlotId >  0) {
                        break;
                    }
                }
            }
            
            const isParked = await ParkingSlot.findByCarId(car.id);

            if (isParked.length > 0) {
                return res.end(JSON.stringify({ message: 'Car is already parked' }))
            }

            const parkingSlot = await ParkingSlot.findById(parkingSlotId)

            const parkingSlotData = {
                type: parkingSlot.type,
                car_id: parseInt(car.id)
            }

            const parkIn = carService.isWithinHour(car.park_out, car.park_in) ? car.park_in : moment();

            const carData = {
                plate_number: car.plate_number,
                type: car.type,
                park_in: parkIn,
                park_out: car.park_out,
                status: 1
            }

            await ParkingSlot.update(parkingSlotId, parkingSlotData)
            const updatedCar = await Car.update(id, carData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updatedCar)) 
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Unpark a Car
// @route   POST /api/cars/:id
async function unpark(req, res, id) {
    try {
        const car = await Car.findById(id)

        if(!car) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Car Not Found' }))
        } else {
            const isParked = await ParkingSlot.findByCarId(car.id);

            if (isParked.length < 1) {
                return res.end(JSON.stringify({ message: 'Car is not parked' }))
            }

            const { charge, isReturned } = carService.computeRate(car.park_in, car.type, car.park_out)

            const parkingSlotId = isParked[0].id;
            const parkingSlot = await ParkingSlot.findById(parkingSlotId)

            const parkingSlotData = {
                type: parkingSlot.type,
                car_id: null
            }

            await ParkingSlot.update(parkingSlotId, parkingSlotData)

            const carData = {
                plate_number: car.plate_number,
                type: car.type,
                park_in: isReturned ? car.park_in : null,
                park_out: moment(),
                status: 0
            }

            await Car.update(id, carData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({
                plate_number: car.plate_number,
                charge
            })) 
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar,
    park,
    unpark
}
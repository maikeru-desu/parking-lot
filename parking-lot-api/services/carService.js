const carTypes = require('../enums/carTypes');
const ParkingSlot = require('../models/parkingSlotModel')
const { getDecimalTime } = require('../utils')
const moment = require('moment');

const carService = {
    computeRate: (parkIn, type, park_out) => {
        let rate;
        let isReturned = true;
        const parkOut = moment();
        if (type == carTypes.small) {
            rate = 20;
        } else if (type == carTypes.medium) {
            rate = 60;
        } else {
            rate = 100;
        }

        let totalHours = getDecimalTime(`${parkOut.diff(moment(parkIn), "hours")}:${parkOut.diff(moment(parkIn), "minutes")}`);

        if (totalHours <= 3) {
            if (park_out == null) {
                rate = 40;
            } else {
                rate = 0;
            }
        }

        if (totalHours > 3 && totalHours < 24) {
            totalHours = totalHours - 3;
            rate = (rate * totalHours) + 40;
            isReturned = false;
        }

        if (totalHours >= 24) {
            const days = Math.floor(totalHours/24);
            const hours = totalHours % 24;

            const overCharge = days * 5000;
            rate = rate * hours;
            
            rate = rate + overCharge;
            isReturned = false;
        }

        return {
            charge: rate,
            isReturned
        }
    },
    isWithinHour: (parkout, parkin) => {
        const parkInTime = moment();
        const parkOutTime = moment(parkout);
        const parkInTimeOld = parkin != null ? moment(parkin) : moment();
        const checkHour = getDecimalTime(`${parkInTime.diff(moment(parkInTimeOld), "hours")}:${parkInTime.diff(moment(parkInTimeOld), "minutes")}`);
    
        if (parkin == null) {
            return false;
        }
    
        if (checkHour > 3) {
            return false;
        }
    
        const totalHours = getDecimalTime(`${parkOutTime.diff(moment(parkInTime), "hours")}:${parkOutTime.diff(moment(parkInTime), "minutes")}`);
    
        return totalHours < 1 ? true : false;
    },
    getParkingSlotId: (parkingSlot, car) => {
        let parkingSlotId;
        console.log(parkingSlot);
        if (car.type == 'LARGE') {
            if (parkingSlot.type == carTypes.large && parkingSlot.car_id == null) {
                parkingSlotId = parkingSlot.id;
            }
        } else if (car.type == 'MEDIUM') {
            if ((parkingSlot.type == carTypes.large || parkingSlot.type == carTypes.medium) && parkingSlot.car_id == null) {
                parkingSlotId = parkingSlot.id;
            }
        } else {
            if (parkingSlot.car_id == null) {
                parkingSlotId = parkingSlot.id;
            }
        }

        return parkingSlotId;
    }
}

module.exports = carService
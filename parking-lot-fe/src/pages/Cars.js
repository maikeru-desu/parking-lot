import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { loadCars, parkCar, unparkCar } from '../redux/car/carActions';
import { loadParkingSlots } from '../redux/parkingSlot/parkingSlotActions';
import moment from 'moment';

const Cars = () => {
    let dispatch = useDispatch();
    const [entryPoint, setEntryPoint] = useState({
        entry_point: "1"
    });

    const { entry_point } = entryPoint;

    const { cars } = useSelector(state => state.cars);
    const { parkingSlots } = useSelector(state => state.parkingSlots);

    useEffect(() => {
        dispatch(loadCars());
        dispatch(loadParkingSlots());
    }, [])

    function handlePark(id) {
        dispatch(parkCar(entryPoint, id));
    }

    function handleUnpark(id) {
        dispatch(unparkCar(id));
    }

    const handleChange = (e) => {
        let { value } = e.target;
        setEntryPoint({entry_point: value });
    }
    
    return (
        <section className="container mx-auto p-6">
            <label htmlFor="status" className="font-semibold text-xl">Entry Point</label>
            <select
                id="status"
                name="status"
                value={entry_point}
                onChange={handleChange}
                className="mb-10 col-start-6 col-span-7 block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-5 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value="" disabled selected>Select Entry Point</option>
                <option value="1">1</option>
                <option value="2">4</option>
                <option value="3">16</option>
            </select>

            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-hidden">
                    <table className="w-full">
                        <thead>
                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Plate Number</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Park In</th>
                            <th className="px-4 py-3">Park Out</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                            {cars && cars.map((car) => (
                                <tr className="text-gray-700 hover:bg-gray-100" key={car.id}>
                                    <td className="px-4 py-3 border">
                                        {car.id}
                                    </td>
                                    <td className="px-4 py-3 font-semibold border">{car.plate_number}</td>
                                    <td className="px-4 py-3 font-semibold border">{car.type}</td>
                                    <td className="px-4 py-3 font-semibold border">{ car.park_in != null ? moment(car.park_in).format("YYYY-MM-DD hh:mm:ss A") : "- - -" }</td>
                                    <td className="px-4 py-3 font-semibold border">{ car.park_out != null ? moment(car.park_out).format("YYYY-MM-DD hh:mm:ss A") : "- - -" }</td>
                                    <td className="px-4 py-3 font-semibold border">{ car.status == 0 ? 'Not Parked' : 'Parked'}</td>
                                    
                                    <td className="px-4 py-3 border">
                                        {(() => {
                                            if (car.status == 0) {
                                                return <button
                                                            onClick={() => handlePark(car.id)}
                                                            type="button"
                                                            className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded">
                                                            PARK
                                                        </button>
                                            } else {
                                                return <button
                                                            onClick={() => handleUnpark(car.id)}
                                                            type="button"
                                                            className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded">
                                                            UNPARK
                                                        </button>
                                            }
                                        })()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Cars

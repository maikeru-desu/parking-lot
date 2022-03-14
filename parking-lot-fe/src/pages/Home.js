import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { loadParkingSlots } from '../redux/parkingSlot/parkingSlotActions';

const Home = () => {
    let dispatch = useDispatch();
    const { parkingSlots } = useSelector(state => state.parkingSlots);

    useEffect(() => {
        dispatch(loadParkingSlots());
    }, [])

    return (
        <section className="container mx-auto p-6">
            {parkingSlots && parkingSlots.map((parkingSlot) => (
                <div class="flex justify-center mb-5">
                {parkingSlot && parkingSlot.map((slot) => (
                    <div class={`mr-4 h-32 w-32 p-1 border-2 border-${slot.car_id != null ? "red" : "green"}-500 flex flex-wrap content-center justify-center`}>
                        {slot.id}
                        <br/>
                        {slot.car_id != null ? "NOT AVAILABLE" : "AVAILABLE"}
                        <br/>
                        {slot.type}
                    </div>
                ))}
                </div>
            ))}
        </section>
    )
}

export default Home

import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { deleteEvent, loadEvents } from '../redux/actions';
import { useHistory } from 'react-router-dom';

const Home = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    const { events } = useSelector(state => state.events);
    
    const handleDelete = (id) => {
        if(window.confirm("Are you sure wanted to delete the event?")) {
            dispatch(deleteEvent(id));
        }
    }

    useEffect(() => {
        dispatch(loadEvents());
    }, [])

    return (
        <section class="container mx-auto p-6 font-mono">
            <button onClick={() => history.push("/add")} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Add Event
                </button>
            <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div class="w-full overflow-x-auto">
                <table class="w-full">
                    <thead>
                    <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                        <th class="px-4 py-3">Name</th>
                        <th class="px-4 py-3">Age</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Date</th>
                    </tr>
                    </thead>
                    <tbody class="bg-white">
                        {events && events.map((event) => (

                            <tr class="text-gray-700">
                                <td class="px-4 py-3 border">
                                    <div class="flex items-center text-sm">
                                        <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                                            <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                        </div>
                                        <div>
                                            <p class="font-semibold text-black">{event.title}</p>
                                            <p class="text-xs text-gray-600">Developer</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-ms font-semibold border">22</td>
                                <td class="px-4 py-3 text-xs border">
                                    <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
                                </td>
                                <td class="px-4 py-3 text-sm border">6/4/2000</td>
                            </tr>

                            
                        ))}
                            <tr className="whitespace-nowrap" key={event.id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                        {event.title}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500">{event.date}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {(() => {
                                        if (event.status == 0) {
                                            return 'Pending';
                                        } else if (event.status == 1) {
                                            return 'Done';
                                        } else {
                                            return 'Ongoing';
                                        }
                                    })()}
                                </td>
                                <td>
                                    <button onClick={() => history.push(`/edit/${event.id}`)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        EDIT
                                    </button>
                                    <button onClick={() => handleDelete(event.id)} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </section>
    )
}

export default Home

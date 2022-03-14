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
        <section class="container mx-auto p-6">
            <div class="grid grid-cols-4">
                <button onClick={() => history.push("/add")} className="mb-5 col-start-2 col-span-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Add Event
                </button>

                {/* <select
                    id="status"
                    name="status"
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option>Select Status</option>
                    <option value="0">Pending</option>
                    <option value="2">Ongoing</option>
                    <option value="1">Done</option>
                </select> */}
            </div>
           
            <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div class="w-full overflow-x-auto">
                <table class="w-full">
                    <thead>
                    <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                        <th class="px-4 py-3">Title</th>
                        <th class="px-4 py-3">Date</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody class="bg-white">
                        {events && events.map((event) => (

                            <tr class="text-gray-700" key={event.id}>
                                <td class="px-4 py-3 border">
                                    <div class="flex items-center text-sm">
                                        <div>
                                            <p class="font-semibold text-black">{event.title}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-ms font-semibold border">{event.date}</td>
                                <td class="px-4 py-3 text-xs border">
                                    {(() => {
                                        if (event.status == 0) {
                                            return <span class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-sm"> Pending </span>;
                                        } else if (event.status == 1) {
                                            return <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Done </span>;
                                        } else {
                                            return <span class="px-2 py-1 font-semibold leading-tight text-blue-700 bg-blue-100 rounded-sm"> Ongoing </span>;
                                        }
                                    })()}
                                    {/* <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span> */}
                                </td>
                                <td class="px-4 py-3 text-sm border">
                                    <button onClick={() => history.push(`/edit/${event.id}`)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        EDIT
                                    </button>
                                    <button onClick={() => handleDelete(event.id)} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                                        DELETE
                                    </button>
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

export default Home

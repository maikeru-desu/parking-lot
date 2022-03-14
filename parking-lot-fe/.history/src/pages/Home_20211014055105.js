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
        <div className="container flex justify-center mx-auto">
            <div className="flex flex-col">
                <button onClick={() => history.push("/add")} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Add Event
                </button>
            </div>
            <div className="flex flex-col">
                <div className="w-full">
                    <div className="border-b border-gray-200 shadow">
                        <table className="divide-y divide-gray-300 w-full">
                            <thead className="bg-gray-50">
                                <tr>                                   
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Title
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Date
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Status
                                    </th>
                                    <th>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-300">
                                {events && events.map((event) => (
                                    <tr className="whitespace-nowrap" key={event.id}>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {event.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">{event.date}</div>
                                        </td>
                                        
                                            {(() => {
                                                if (event.status == 0) {
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                    return 'Pending';
                                                    </td>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { loadEvents } from '../redux/actions';

const Home = () => {
    let dispatch = useDispatch();
    const { events } = useSelector(state => state.events)

    useEffect(() => {
        dispatch(loadEvents());
    }, [])
    return (
        <div className="container flex justify-center mx-auto">
            <div className="flex flex-col">
                <div className="w-full">
                    <div className="border-b border-gray-200 shadow">
                        <table className="divide-y divide-gray-300 ">
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
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-300">
                                {events.map((event) => (
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
                                            {event.status = 1 ? 'd' : 'd'}
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

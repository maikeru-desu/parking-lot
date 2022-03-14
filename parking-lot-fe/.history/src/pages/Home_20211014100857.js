import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { filterEvents, loadEvents } from '../redux/actions';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [state, setState] = useState({
        title: "",
        date: "",
        status: ""
    });

    const { title, date, status } = state;

    let dispatch = useDispatch();
    let history = useHistory();
    const { events } = useSelector(state => state.events);

    useEffect(() => {
        dispatch(loadEvents());
    }, [])

    useEffect(() => { 
        if (state.status != "" || state.title != "") {
            let params = "";
            let operator = "?";
            if (state.status != "") {
                operator = '&';
                params += state.status != "" ? `?status=${state.status}` : "";
            }
            params += state.title != "" ? `${operator}title_like=${state.title}` : "";
            dispatch(filterEvents(params));
        } else {
            dispatch(loadEvents());
        }
    }, [state])

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <section class="container mx-auto p-6">
            <div class="grid grid-cols-7">
                <input
                    name="title"
                    id="title"
                    value={title}
                    type={title}
                    onChange={handleChange}
                    placeholder="Search Events"
                    className="mb-5 col-start-1 col-span-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-500"
                />

                <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={handleChange}
                    className="mb-5 col-start-6 col-span-7 block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-5 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="">Select Filter</option>
                    <option value="0">Pending</option>
                    <option value="2">Ongoing</option>
                    <option value="1">Done</option>
                </select>
            </div>
           
            <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div class="w-full overflow-x-hidden">
                <table class="w-full">
                    <thead>
                    <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                        <th class="px-4 py-3">Title</th>
                        <th class="px-4 py-3">Date</th>
                        <th class="px-4 py-3">Status</th>
                        {/* <th class="px-4 py-3">Action</th> */}
                    </tr>
                    </thead>
                    <tbody class="bg-white">
                        {events && events.map((event) => (
                            <tr onClick={() => history.push(`/edit/${event.id}`)} class="text-gray-700 hover:bg-gray-100" key={event.id}>
                                <td class="px-4 py-3 border">
                                    <div class="flex items-center text-sm">
                                        <div>
                                            <p class="font-semibold text-black">{event.title}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-4 py-3 font-semibold border">{event.date}</td>
                                <td class="px-4 py-3 border">
                                    {(() => {
                                        if (event.status == 0) {
                                            return <span class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-sm"> Pending </span>;
                                        } else if (event.status == 1) {
                                            return <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Done </span>;
                                        } else {
                                            return <span class="px-2 py-1 font-semibold leading-tight text-blue-700 bg-blue-100 rounded-sm"> Ongoing </span>;
                                        }
                                    })()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            <button onClick={() => history.push("/add")} className="mb-5 col-start-3 col-span-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Add Event
            </button>
        </section>
    )
}

export default Home

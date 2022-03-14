import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, updateEvent } from '../redux/actions';

const Edit = () => {
    const [state, setState] = useState({
        title: "",
        date: "",
        status: ""
    });

    const [error, setError] = useState("");
    let {id} = useParams();
    const { event } = useSelector((state) => state.events);
    let history = useHistory();
    let dispatch = useDispatch();
    const { title, date, status } = state;

    useEffect(() => {
        dispatch(getEvent(id));
    }, []);

    useEffect(() => {
        if (event) {
            setState({ ...event })
        }
    }, [event])

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !date || !status) {
            setError("All fields are required");
        } else {
            dispatch(updateEvent(state, id));
            history.push('/');
            setError("");
        }
    }
    return (
        <div>
            <form method="POST" onSubmit={handleSubmit}>
                {error && <h3 className="text-red-700">{error}</h3>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
                        Title
                    </label>
                    <input
                        name="title"
                        id="title"
                        value={title}
                        type={title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                        Subject
                    </label>
                    <div className="relative">
                        <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={handleChange}
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option>Select Status</option>
                            <option value="0">Pending</option>
                            <option value="2">Ongoing</option>
                            <option value="1">Done</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => history.push("/")}
                        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button">
                        BACK
                    </button>
                    <button
                        type="submit"
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        ADD EVENT
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Edit

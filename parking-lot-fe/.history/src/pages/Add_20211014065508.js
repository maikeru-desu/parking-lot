import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEvent } from '../redux/actions';
import '../form.css';

const Add = () => {
    const [state, setState] = useState({
        title: "",
        date: "",
        status: ""
    });

    const [error, setError] = useState("");

    let history = useHistory();
    let dispatch = useDispatch();
    const {title, date, status} = state;

    const handleChange = (e) => {
        let {name, value} = e.target;
        console.log(value);
        setState({...state, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
        if (!title || !date || !status) {
            setError("All fields are required");
        } else {
            dispatch(addEvent(state));
            history.push('/');
            setError("");
        }
    }
    return (
        <div>
            <button onClick={ () => history.push("/") } className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                GO BACK
            </button>
            {error && <h3 className="text-red-700">{error}</h3>}
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Title
                                            </label>
                                            <input
                                                name="title"
                                                id="title"
                                                value={title}
                                                type={title}
                                                onChange={handleChange}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                id="date"
                                                value={date}
                                                onChange={handleChange}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                Status
                                            </label>
                                            <select 
                                                id="status"
                                                name="status"
                                                value={status}
                                                onChange={handleChange}
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option>Choose Status</option>
                                                <option value="0">Pending</option>
                                                <option value="2">Ongoing</option>
                                                <option value="1">Done</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add

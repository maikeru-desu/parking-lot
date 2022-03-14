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

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const [error, setError] = useState("");

    let history = useHistory();
    let dispatch = useDispatch();
    const {title, date, status} = state;

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !date || !status) {
            setError("All fields are required");
        } else {
            if (window.confirm("Are you sure wanted to add the event?")) {
                dispatch(addEvent(state));
                history.push('/');
                setError("");
            }
        }
    }
    return (
        <div>
            <form method="POST" onSubmit={handleSubmit}>
                {error && <h3 className="text-red-700">{error}</h3>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
                        TITLE
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
                        DATE
                    </label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        onChange={handleChange}
                        minDate={moment().toDate()}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
                        STATUS
                    </label>
                    <div className="relative">
                        <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={handleChange}
                            className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
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
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded"
                        type="button">
                        BACK
                    </button>
                    <button
                        type="submit"
                        className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded">
                        ADD EVENT
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Add

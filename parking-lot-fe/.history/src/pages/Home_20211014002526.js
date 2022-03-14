import React from 'react'
import {useDispatch, useSelector} from "react-redux";

const Home = () => {
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
                                        Email
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Created_at
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-300">
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            Jon doe
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">jhondoe@example.com</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        2021-1-12
                                    </td>
                                </tr>
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            Jon doe
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">jhondoe@example.com</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        2021-1-12
                                    </td>
                                </tr>
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            Jon doe
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">jhondoe@example.com</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        2021-1-12
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

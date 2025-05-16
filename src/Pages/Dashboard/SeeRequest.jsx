import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const SeeRequest = () => {
    const petDetail = useLoaderData();
    const [request, setRequest] = useState([]);

    useEffect(() => {
        fetch(`https://medi-care-cerver.vercel.app/adoption/${petDetail._id}`)
            .then(res => res.json())
            .then(data => setRequest(data));
    }, [petDetail._id]);

    const handleAccept = (id) => {
        fetch(`https://medi-care-cerver.vercel.app/adoption/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'accepted' }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Success!', 'Request accepted!', 'success');
                    setRequest(prev =>
                        prev.map(req =>
                            req._id === id ? { ...req, status: 'accepted' } : req
                        )
                    );
                }
            });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-center text-xl sm:text-3xl font-bold text-[#22b7cd] mb-6">
                Total Requests: {request.length}
            </h1>

            {request.length > 0 ? (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-[700px] w-full bg-white border border-gray-200 text-sm sm:text-base">
                        <thead>
                            <tr className="bg-[#22b7cd] text-white">
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Location</th>
                                <th className="px-4 py-2 border">Phone</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {request.map((item) => (
                                <tr key={item._id} className="text-center hover:bg-gray-100 transition">
                                    <td className="px-4 py-2 border">{item.userName || 'N/A'}</td>
                                    <td className="px-4 py-2 border">{item.userAddress || 'N/A'}</td>
                                    <td className="px-4 py-2 border">{item.userPhone || 'N/A'}</td>
                                    <td className="px-4 py-2 border break-words">{item.userEmail || 'N/A'}</td>
                                    <td className="px-4 py-2 border capitalize">{item.status || 'pending'}</td>
                                    <td className="px-4 py-2 border">
                                        {item.status === 'accepted' ? (
                                            <span className="text-green-600 font-semibold">Accepted</span>
                                        ) : (
                                            <button
                                                className="bg-[#22b7cd] hover:bg-[#1ca2b5] text-white px-3 py-1 rounded text-sm"
                                                onClick={() => handleAccept(item._id)}
                                            >
                                                Accept
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg">No requests found.</p>
            )}
        </div>
    );
};

export default SeeRequest;

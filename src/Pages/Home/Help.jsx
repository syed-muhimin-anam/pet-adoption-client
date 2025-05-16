import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Help = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            const res = await fetch('http://localhost:5000/donation-home?_sort=date&_order=desc&_limit=4');
            const data = await res.json();
            setCampaigns(data);
        };
        fetchCampaigns();
    }, []);

    return (
        <div className="w-10/12 container mx-auto px-4 py-16 mt-[66px]">
            <h2 className="text-4xl font-bold text-center text-[#22b7cd] mb-10">They needs your help</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {campaigns.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#FFF7EC] border rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
                    >
                        <img src={item.image} alt={item.petName} className="w-full h-40 object-cover rounded-md mb-4" />
                        <h3 className="text-xl font-semibold text-[#22b7cd]">{item.petName}</h3>
                        <p className="text-gray-600 text-sm font-bold">{item.shortDescription}</p>
                        <p className="text-gray-600 text-sm">Max Donation: ${item.maxAmount}</p>
                        <p className="text-gray-600 text-sm">Donated: ${item.donatedAmount}</p>
                        <Link to={`/donation/${item._id}`}>
                            <button className="mt-3 bg-[#22b7cd] text-white px-4 py-2 rounded hover:bg-[#1ca2b5] w-full">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

            <div className='mt-2 flex justify-center'>
                <Link
                to="/donation"
                className= 'button bg-[#22b7cd] text-white px-4 py-2 rounded-sm mt-10 mx-auto'
            >
                View More
            </Link>
            </div>
        </div>
    );
};

export default Help;

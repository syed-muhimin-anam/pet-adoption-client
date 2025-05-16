import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const DonationCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchCampaigns = async () => {
    const res = await fetch(`http://localhost:5000/donation-campaigns?_sort=date&_order=desc&_page=${page}&_limit=6`);
    const data = await res.json();
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setCampaigns(prev => [...prev, ...data]);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [page]);

  const lastCampaignRef = useCallback(node => {
    if (!hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  return (
    <div className="container mx-auto px-4 py-16 mt-[66px] w-10/12">
      <h2 className="text-xl md:text-4xl font-bold text-center text-[#22b7cd] mb-10">Donation Campaigns</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((item, i) => (
          <div
            key={item.id}
            ref={i === campaigns.length - 1 ? lastCampaignRef : null}
            className="bg-[#FFF7EC] border rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
          >
            <img src={item.image} alt={item.petName} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-[#22b7cd]">{item.petName}</h3>
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
      {/* {!hasMore && <p className="text-center mt-6 text-gray-500">No more campaigns.</p>} */}
    </div>
  );
};

export default DonationCampaigns;

import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Payment from '../Payment/Payment';

const DonationDetails = () => {
  const donationDetail = useLoaderData();
  const {
    petName,
    image,
    maxAmount,
    donatedAmount,
    description,
    age,
    location,
    activate
  } = donationDetail;

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  console.log(amount);




  return (
    <div className="max-w-4xl mx-auto mt-24 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <img src={image} alt={petName} className="w-full h-64 object-cover rounded" />
        <h2 className="text-3xl font-bold text-[#22b7cd]">{petName}</h2>
        <p className="text-gray-700">{description}</p>
        <p><span className="font-semibold">Age:</span> {age}</p>
        <p><span className="font-semibold">Location:</span> {location}</p>
        <p className="text-lg"><span className="font-semibold">Goal:</span> {maxAmount} BDT</p>
        <p className="text-lg"><span className="font-semibold">Donated:</span> {donatedAmount} BDT</p>

        <button
          onClick={() => setShowModal(true)}
          disabled={!activate} 
          className={`px-6 py-2 rounded transition 
    ${activate
              ? 'bg-[#22b7cd] hover:bg-[#1ca2b5] text-white cursor-pointer'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
        >
          {activate ? 'Donate Now' : 'Donation is Paused'}
        </button>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 relative">
            <h3 className="text-xl font-bold mb-2 text-center">Donate to {petName}</h3>
            {/* <form onSubmit={handleDonate} className="space-y-4"> */}
            <div>
              <label className="block font-semibold">Donation Amount (BDT)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className='mt-6'>
              <h1 className='text-lg font-semibold mb-5'>Fill your card information</h1>
              <Payment amount={amount} donationDetail={donationDetail} ></Payment>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              {/* <button
                  type="submit"
                  className="bg-[#22b7cd] text-white px-4 py-2 rounded hover:bg-[#1ca2b5]"
                >
                  Confirm Donate
                </button> */}
            </div>
            {/* </form> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;

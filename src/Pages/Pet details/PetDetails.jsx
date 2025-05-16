import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';


const PetDetails = () => {
  const petDetail = useLoaderData();
  console.log(petDetail);
  
  const { _id, name, age, category, location, image } = petDetail;

  const { user } = useContext(AuthContext); 
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
  });

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    

    const adoptionData = {
      petId: _id,
      petName: name,
      petImage: image,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhone: formData.phone,
      userAddress: formData.address,
      status: 'pending'
    };
console.log(adoptionData);

        fetch('https://medi-care-cerver.vercel.app/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adoptionData)
        })
        .then(res => res.json())        
        .then(data => {
            if (data.insertedId) {
            setShowModal(false);
            Swal.fire('Success!', 'Adoption request submitted.', 'success');
            }
        });
    };

  return (
    <div className="container mx-auto px-4 py-16 mt-[66px]">
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center md:items-start">
        <img src={image} alt={name} className="w-full md:w-1/2 h-64 md:h-full object-cover" />

        <div className="p-6 md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-[#22b7cd]">{name}</h2>
          <p className="text-gray-700 text-lg"><span className="font-semibold text-[#22b7cd]">Category:</span> {category}</p>
          <p className="text-gray-700 text-lg"><span className="font-semibold text-[#22b7cd]">Age:</span> {age}</p>
          <p className="text-gray-700 text-lg"><span className="font-semibold text-[#22b7cd]">Location:</span> {location}</p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-[#22b7cd] text-white px-6 py-2 rounded-md hover:bg-[#1ca2b5] transition duration-200 shadow"
          >
            Adopt Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-md shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#22b7cd] text-center">Adopt {name}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">User Name</label>
                <input
                  type="text"
                  value={user?.displayName || ''}
                  disabled
                  className="w-full border px-3 py-2 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full border px-3 py-2 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700"> YourAddress</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Enter your address where you want to receive this pet."
                />
              </div>
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="bg-[#22b7cd] text-white px-6 py-2 rounded-md hover:bg-[#1ca2b5] transition duration-200"
                >
                  Submit Adoption Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetails;

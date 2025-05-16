
import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

const PetCategory = () => {
  const pet = useLoaderData();
  console.log(pet);


  return (
    <div className="container mx-auto py-12 px-4 mt-[66px]">
      <h2 className="text-4xl font-bold text-center text-[#22b7cd] mb-10">
        All {pet[0]?.category || 'Pets'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {pet.map((item) => (
          <div
            key={item._id}
            className="bg-[#FFF7EC] border rounded-sm overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-[#22b7cd] mb-1">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-1">{item.category}</p>
              <p className="text-[#22b7cd] font-medium text-sm">Age: {item.age}</p>
              <p className="text-[#22b7cd] font-medium text-sm">Location: {item.location}</p>

              <div className="pt-4">
                <Link to={`/petDetails/${item._id}`}>
                  <button className="w-full btn bg-[#22b7cd] text-[#FFF7EC] hover:bg-[#FFF7EC] hover:text-[#22b7cd] font-semibold px-4 py-2 rounded-sm shadow-md text-sm">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pet.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No pets found in this category.</p>
      )}
    </div>
  );
};

export default PetCategory;

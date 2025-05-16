import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Pet = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/pets')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        setPets(data);
        setFilteredPets(data);
        const uniqueCategories = ['All', ...new Set(data.map(pet => pet.category))];
        setCategories(uniqueCategories);
      });
  }, []);


  useEffect(() => {
    const filtered = pets.filter(pet => {
      const matchesName = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || pet.category === categoryFilter;
      return matchesName && matchesCategory;
    });
    setFilteredPets(filtered);
  }, [searchTerm, categoryFilter, pets]);

  return (
    <div className="container mx-auto py-12 w-10/12 px-4 mt-[66px]">
      <h2 className="text-xl md:text-4xl font-bold text-center text-[#22b7cd] mb-4">Find Your Perfect Pet</h2>
      {/* <h3 className="text-center mb-6 text-lg font-bold">Total available pets: {filteredPets.length}</h3> */}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-64"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="select select-bordered w-full md:w-64"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Pet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredPets.map((item) => (
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
              <p className="text-gray-600 text-sm mb-1 line-clamp-2">{item.category}</p>
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

      {filteredPets.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No pets found.</p>
      )}
    </div>
  );
};

export default Pet;

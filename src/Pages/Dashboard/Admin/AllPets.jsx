import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';

const AllPets = () => {
    const [pets, setPet] = useState([]);

    // const [pets] = usePet()

    useEffect(() => {
        fetch('http://localhost:5000/pets')
            .then(res => res.json())
            .then(data => setPet(data));
    }, []);
    console.log(pets.length);

    // const axiosSecure = useAxiosSecure();
    // const navigate = useNavigate();
    // const { logout } = useContext(AuthContext);

    // // Fetch users
    // useEffect(() => {
    //     axiosSecure.get('/pets')
    //         .then(res => setPet(res.data))
    //         .catch(async err => {
    //             const status = err.response?.status;
    //             if (status === 401 || status === 403) {
    //                 await logout();
    //                 navigate('/login');
    //             } else {
    //                 console.error(err);
    //             }
    //         });
    // }, [axiosSecure, logout, navigate]);


    const handleDelete = async (pet) => {
        const result = await Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to delete "${pet.name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`http://localhost:5000/pets/${pet._id}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (data.deletedCount > 0) {
                Swal.fire('Deleted!', `"${pet.name}" has been deleted.`, 'success');
                // Remove deleted pet from UI
                setPet(prevPets => prevPets.filter(p => p._id !== pet._id));
            } else {
                Swal.fire('Failed!', 'Could not delete the pet. Try again.', 'error');
            }
        } catch (error) {
            console.error('Delete error:', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };


    const handleAdopted = async (pet) => {
        const newStatus = !pet.adopted;

        const result = await Swal.fire({
            title: `Are you sure?`,
            text: `Mark "${pet.name}" as ${newStatus ? 'adopted' : 'not adopted'}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${newStatus ? 'adopt' : 'unadopt'} it!`
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`http://localhost:5000/pets/${pet._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adopted: newStatus }),
            });

            const data = await res.json();
            if (data.modifiedCount > 0) {
                setPet(prevPets =>
                    prevPets.map(p =>
                        p._id === pet._id ? { ...p, adopted: newStatus } : p
                    )
                );

                Swal.fire(
                    'Updated!',
                    `Pet marked as ${newStatus ? 'adopted' : 'not adopted'}!`,
                    'success'
                );
                // await refetch(); 
            } else {
                Swal.fire(
                    'Failed!',
                    'Failed to update. Please try again.',
                    'error'
                );
            }
        } catch (error) {
            console.error('Adopt toggle error:', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };



    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold mb-10 text-center text-[#22b7cd]">All Pets</h2>

            {/* Responsive table wrapper */}
            <div className="w-full overflow-x-auto">
                <table className="min-w-[800px] table-auto border border-gray-300 w-full text-sm">
                    <thead className="bg-[#22b7cd] text-white">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Age</th>
                            <th className="px-4 py-2">Action</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet, index) => (
                            <tr key={pet._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">
                                    <img src={pet.image} alt="pet" className="w-10 h-10 rounded-full object-cover" />
                                </td>
                                <td className="px-4 py-2">{pet.name}</td>
                                <td className="px-4 py-2">{pet.category}</td>
                                <td className="px-4 py-2">{pet.age}</td>
                                <td className="px-4 py-2 flex gap-2 flex-wrap">
                                    <Link to={`/dashboard/edit/${pet._id}`}>
                                        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
                                            <FaEdit />
                                        </button>
                                    </Link>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                                        onClick={() => handleDelete(pet)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleAdopted(pet)}
                                        className={`btn btn-sm text-white text-xs whitespace-nowrap ${pet.adopted ? 'bg-green-600' : 'bg-red-500'
                                            }`}
                                    >
                                        {pet.adopted ? 'Unadopted' : 'Adopted'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default AllPets;
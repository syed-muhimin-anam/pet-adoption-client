import React from 'react';
import usePet from '../../Hooks/usePet';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyPets = () => {
    const [pets, refetch] = usePet();


    const columns = [
        {
            header: '#',
            id: 'serial',
            cell: ({ row }) => row.index + 1,
        },
        {
            header: 'Image',
            accessorKey: 'image',
            cell: ({ row }) => (
                <img
                    src={row.original.image}
                    alt={row.original.name}
                    className="w-12 h-12 object-cover rounded"
                />
            ),
        },
        {
            header: 'Name',
            accessorKey: 'name',
        },
        {
            header: 'Age',
            accessorKey: 'age',
        },
        {
            header: 'Location',
            accessorKey: 'location',
        },
        {
            header: 'Adopted',
            accessorKey: 'adopted',
            cell: ({ row }) => (
                <span className={row.original.adopted ? 'text-green-600' : 'text-red-500'}>
                    {row.original.adopted ? 'Yes' : 'No'}
                </span>
            ),
        },
        {
            header: 'Action',
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <Link to={`/dashboard/edit/${row.original._id}`}>
                            <FaEdit />
                        </Link>
                    </button>

                    <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(row.original)}
                    >
                        <FaTrash />
                    </button>

                    <button
                        className={`px-3 py-1 ${row.original.adopted ? 'bg-yellow-500' : 'bg-green-500'} text-white rounded hover:opacity-80`}
                        onClick={() => handleAdopted(row.original)}
                    >
                        {row.original.adopted ? 'Unadopt' : 'Adopt'}
                    </button>
                </div>
            ),
        },
    ];



    const table = useReactTable({
        data: pets,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

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
                Swal.fire(
                    'Updated!',
                    `Pet marked as ${newStatus ? 'adopted' : 'not adopted'}!`,
                    'success'
                );
                await refetch(); // Refresh data after update
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
                await refetch(); // Refresh list after deletion
            } else {
                Swal.fire('Failed!', 'Could not delete the pet. Try again.', 'error');
            }
        } catch (error) {
            console.error('Delete error:', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };








    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-xl md:text-4xl font-bold mb-6 text-center text-[#22b7cd]">
                Your total uploaded pets ({pets.length})
            </h1>

            {pets.length === 0 ? (
                <p className="text-center text-gray-500 text-lg md:text-xl">You haven't uploaded any pets yet.</p>
            ) : (
                <div className="w-full overflow-x-auto">
                    <table className="min-w-[700px] w-full border text-left text-sm md:text-base">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="border px-3 py-2 md:px-4 md:py-3 bg-[#22b7cd] text-white whitespace-nowrap">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="border px-3 py-2 md:px-4 md:py-3 whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );

};

export default MyPets;

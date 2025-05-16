import React, { useContext, useEffect, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';

import { FaEdit, FaPause, FaPlay, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';

const AllDonations = () => {

    const [campaign, setCampaign] = useState([]);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);






    // Fetch users
    useEffect(() => {
        axiosSecure.get('/donation-campaigns')
            .then(res => setCampaign(res.data))
            .catch(async err => {
                const status = err.response?.status;
                if (status === 401 || status === 403) {
                    await logout();
                    navigate('/login');
                } else {
                    console.error(err);
                }
            });
    }, [axiosSecure, logout, navigate]);


    const columns = [
        {
            header: 'Image',
            accessorKey: 'image',
            cell: ({ row }) => (
                <img
                    src={row.original.image}
                    alt={row.original.name}
                    className="w-16 h-16 object-cover rounded"
                />
            ),
        },
        {
            header: 'Name',
            accessorKey: 'petName',
        },
        {
            header: 'Max donation amount',
            accessorKey: 'maxAmount',
        },

        {
            header: 'Progress',
            accessorKey: 'donatedAmount',
            cell: ({ row }) => {
                const collected = row.original.donatedAmount || 0;
                const max = row.original.maxAmount || 1; 
                const percent = Math.min((collected / max) * 100, 100);

                return (
                    <div className="w-56">
                        <progress
                            className="progress progress-info w-full"
                            value={collected}
                            max={max}
                        ></progress>
                        <div className="text-sm mt-1 text-gray-600 text-center">
                            {collected} / {max} ({percent.toFixed(1)}%)
                        </div>
                    </div>
                );
            },
        },
        {
            header: 'Action',
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Link to={`/dashboard/editCampaign/${row.original._id}`}>
                        <button
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        
                        >
                            <FaEdit></FaEdit>
                        </button>
                    </Link>
                    <button
                        className={`px-3 py-1 ${row.original.activate ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                            } text-white rounded`}
                        onClick={() => handleActivate(row.original)}
                        disabled={row.original.adopted}
                        title={row.original.activate ? 'Pause Campaign' : 'Activate Campaign'}
                    >
                        {row.original.activate ? <FaPause /> : <FaPlay />}
                    </button>

                    <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-green-600"
                        onClick={() => handleDelete(row.original)}
                        disabled={row.original.adopted}
                    >
                        <FaTrash></FaTrash>
                    </button>
                </div>
            ),
        },


    ];


    const table = useReactTable({
        data: campaign,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });



    const handleDelete = async (campaign) => {
        if (!campaign._id) {
            Swal.fire({
                icon: 'error',
                title: 'Missing campaign ID',
                text: 'Cannot delete because campaign ID is missing.',
            });
            return;
        }

        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: "This campaign will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmResult.isConfirmed) {
            try {
                const res = await fetch(`https://medi-care-cerver.vercel.app/donation-campaigns/${campaign._id}`, {
                    method: 'DELETE'
                });

                const data = await res.json();

                if (data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'The campaign has been deleted.', 'success');

                    // Update UI by removing deleted item
                    setCampaign(prevCampaigns =>
                        prevCampaigns.filter(c => c._id !== campaign._id)
                    );
                } else {
                    Swal.fire('Failed!', 'No campaign was deleted.', 'info');
                }
            } catch (error) {
                console.error('Error deleting campaign:', error);
                Swal.fire('Error', 'Something went wrong while deleting.', 'error');
            }
        }
    };




    // Accept request handler
    const handleActivate = async (campaignItem) => {
        try {
            const res = await fetch(`https://medi-care-cerver.vercel.app/donation-campaigns/${campaignItem._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activate: !campaignItem.activate })
            });

            const data = await res.json();

            if (data.modifiedCount > 0) {
                Swal.fire('Success!', `Campaign has been ${!campaignItem.activate ? 'activated' : 'paused'}`, 'success');

                // Update the campaign activation status in the UI immediately
                setCampaign(prevCampaigns =>
                    prevCampaigns.map(campaign =>
                        campaign._id === campaignItem._id
                            ? { ...campaign, activate: !campaignItem.activate }
                            : campaign
                    )
                );
            } else {
                Swal.fire('No changes made', '', 'info');
            }
        } catch (error) {
            console.error('Error updating campaign activation:', error);
            Swal.fire('Error', 'Something went wrong.', 'error');
        }
    };





    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-10 text-[#22b7cd] text-center">
                All Donation Campaign: {campaign.length}
            </h1>

            <div className="overflow-x-auto">
                <table className="table-auto border w-full text-left min-w-[800px]">
                    <thead className="bg-[#22b7cd] text-white">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="border px-4 py-2 whitespace-nowrap">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="border px-4 py-2 whitespace-nowrap">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default AllDonations;
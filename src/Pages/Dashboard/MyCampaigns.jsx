import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
// import { FaEdit, FaTrash } from 'react-icons/fa';
import useCampain from '../../Hooks/useCampain';
import { FaEdit, FaPause, FaPlay } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyCampaigns = () => {
    const [campaign, refetch] = useCampain();
    console.log(campaign);

    const columns = [
        {
            header: '#',
            accessorKey: 'serialNo',
            cell: ({ row }) => row.index + 1,
        },
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
            header: 'Max amount',
            accessorKey: 'maxAmount',
        },
        {
            header: 'Progress',
            accessorKey: 'donatedAmount',
            cell: ({ row }) => {
                const collected = row.original.donatedAmount || 0;
                const max = row.original.maxAmount || 1; // avoid divide by 0
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
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <Link to={`/dashboard/editCampaign/${row.original._id}`}>
                            <FaEdit />
                        </Link>
                    </button>

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
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-green-600"
                        onClick={() => handleDonor(row.original)}
                        disabled={row.original.adopted}
                    >
                        See Donor
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



    const handleDonor = async (campaign) => {
        // console.log(campaign);

        // const petId = campaign.petId;

        if (!campaign._id) {
            Swal.fire({
                icon: 'error',
                title: 'Missing petId',
                text: 'Cannot find donor data because petId is missing.',
            });
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/payment-info/${campaign._id}`);
            const data = await res.json();

            if (!Array.isArray(data) || data.length === 0) {
                return Swal.fire({
                    icon: 'info',
                    title: 'No Donors Found',
                    html: 'No donor has contributed yet.',
                });
            }

            const donorList = data.map(
                (donor, index) =>
                    `${index + 1}. ${donor.userName || donor.userEmail || 'Anonymous'} - ${donor.donationAmount}৳`
            ).join('<br>');

            Swal.fire({
                title: 'Donor List',
                html: donorList,
                icon: 'info',
                confirmButtonText: 'Close',
                width: 500,
            });
        } catch (error) {
            console.error('Error fetching donors:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch donor information.',
            });
        }
    };



    // Accept request handler
    const handleActivate = async (campaignItem) => {
        try {
            const res = await fetch(`http://localhost:5000/donation-campaigns/${campaignItem._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activate: !campaignItem.activate })
            });

            const data = await res.json();

            if (data.modifiedCount > 0) {
                Swal.fire('Success!', `Campaign has been ${!campaignItem.activate ? 'activated' : 'paused'}`, 'success');
                refetch(); // refresh campaign list after update
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
            <h1 className="text-4xl font-bold text-[#22b7cd] mb-10 text-center">
                Your total campaign - ({campaign.length})
            </h1>

            {campaign.length === 0 ? (
                <p className="text-center text-gray-600 text-lg mt-10">
                    You haven’t created any donation campaigns yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-left">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="border px-4 py-2 bg-[#22b7cd] text-white whitespace-nowrap">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-gray-100 transition">
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

            )}
        </div>
    );

};

export default MyCampaigns;
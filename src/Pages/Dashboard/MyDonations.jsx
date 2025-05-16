import React from 'react';
import useDonation from '../../Hooks/useDonation';
import Swal from 'sweetalert2';

const MyDonations = () => {
    const [myDonation, refetch] = useDonation();

    const handleRefund = async (petId, refundAmount, donationId) => {
        try {
            const res = await fetch(`http://localhost:5000/donation-campaigns/${petId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ donatedAmount: -refundAmount })
            });

            const data = await res.json();

            if (data.modifiedCount > 0) {
                const deleteRes = await fetch(`http://localhost:5000/my-donation/${donationId}`, {
                    method: 'DELETE'
                });

                const deleteData = await deleteRes.json();

                if (deleteData.deletedCount > 0) {
                    Swal.fire('Refund Successful', `You have refunded $${refundAmount}`, 'success');
                    refetch();
                } else {
                    Swal.fire('Refunded, but failed to remove record', '', 'warning');
                }
            } else {
                Swal.fire('No changes made', '', 'info');
            }
        } catch (error) {
            console.error('Error processing refund:', error);
            Swal.fire('Error', 'Something went wrong.', 'error');
        }
    };

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-10 text-[#22b7cd]">
                My Total Donations
            </h1>

            {myDonation.length === 0 ? (
                <p className="text-center text-gray-600">You haven't donated yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full md:w-10/12 mx-auto border border-gray-300 text-sm md:text-base rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-[#22b7cd] text-white">
                                <th className="py-3 px-4 border">#</th>
                                <th className="py-3 px-4 border">Pet Image</th>
                                <th className="py-3 px-4 border">Pet Name</th>
                                <th className="py-3 px-4 border">Donated Amount</th>
                                <th className="py-3 px-4 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myDonation.map((donation, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                                    <td className="py-2 px-4 border text-center">
                                        <img
                                            src={donation.petImage}
                                            alt="Pet"
                                            className="w-12 h-12 object-cover rounded mx-auto"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border text-center">{donation.donateFor}</td>
                                    <td className="py-2 px-4 border text-green-600 font-semibold text-center">
                                        ${donation.donationAmount}
                                    </td>
                                    <td className="py-2 px-4 border text-center">
                                        <button
                                            onClick={() => handleRefund(donation.petId, donation.donationAmount, donation._id)}
                                            className="bg-[#2ce3ff] hover:bg-[#1bcbe0] text-white px-4 py-1 rounded transition duration-200"
                                        >
                                            Refund
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyDonations;

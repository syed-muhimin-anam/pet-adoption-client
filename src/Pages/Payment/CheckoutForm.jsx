import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ amount, donationDetail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [confirmed, setConfirmed] = useState(false); 
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchClientSecret = async () => {
        if (!amount) return;

        try {
            const res = await fetch('https://medi-care-cerver.vercel.app/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ price: parseFloat(amount) }),
            });

            const data = await res.json();
            setClientSecret(data.clientSecret);
            console.log('Client secret:', data.clientSecret);
        } catch (err) {
            console.error('Error creating payment intent:', err);
        }
    };

    const handleSure = () => {
        setConfirmed(true);
        fetchClientSecret();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            return;
        }

        setError('');

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.error('Payment confirmation error:', confirmError);
            setError(confirmError.message);
        } else {
            console.log('Payment successful:', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                Swal.fire({
                    title: 'Payment Successful 🎉',
                    html: `
            <p><strong>Transaction ID:</strong> ${paymentIntent.id}</p>
            <p><strong>Amount:</strong> $${(paymentIntent.amount / 100).toFixed(2)}</p>
            <p><strong>Email:</strong> ${user?.email || 'anonymous'}</p>
        `,
                    icon: 'success',
                    confirmButtonColor: '#22b7cd'
                });
            }



            // sned payment data to database 

            const paymentDetails = {
                userEmail: user.email,
                userName: user.displayName,
                transactionId: paymentIntent.id,
                donationAmount: paymentIntent.amount / 100,
                donateFor: donationDetail.petName,
                petId: donationDetail._id,
                date: new Date(),
                petImage: donationDetail.image

            }

            // console.log(paymentDetails);
            const donationToAdd = paymentDetails.donationAmount;

            console.log(donationDetail);
            
            try {
                const res = await fetch('https://medi-care-cerver.vercel.app/payments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(paymentDetails),
                });

                const data = await res.json();

                if (data.insertedId) {
                    console.log('Donation recorded successfully:', data);

        
                    try {
                
                        const res = await fetch(`https://medi-care-cerver.vercel.app/donation-campaigns/${donationDetail._id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                donatedAmount: donationToAdd, 
                            }),
                        });


                        const result = await res.json();
                        if (result.modifiedCount > 0) {
                            console.log('Campaign updated with donation amount.');
                        } else {
                            console.warn('No campaign update occurred.');
                        }
                    } catch (patchError) {
                        console.error('Error updating campaign donation amount:', patchError);
                    }
                }

                else {
                    console.error('Failed to save payment:', data);


               

                }


            } catch (err) {
                console.error('Error saving payment to DB:', err);
            }
            navigate('/donation')




        }
    };

    return (
        <div>
            <p>Are you sure?</p>
            <button
                onClick={handleSure}
                className={`btn mb-4 ${confirmed ? 'bg-green-500 text-white' : ''}`}
            >
                yes
            </button>

            <form onSubmit={handleSubmit}>
                <div className="border-2 border-gray-300 p-3 rounded">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': { color: '#aab7c4' },
                                },
                                invalid: { color: '#9e2146' },
                            },
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="bg-[#22b7cd] px-4 py-1 mt-5 text-white rounded-sm"
                >
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;

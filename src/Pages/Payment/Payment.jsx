import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = ({amount, donationDetail}) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm amount={amount} donationDetail={donationDetail} ></CheckoutForm>
            </Elements>

        </div>
    );
};

export default Payment;
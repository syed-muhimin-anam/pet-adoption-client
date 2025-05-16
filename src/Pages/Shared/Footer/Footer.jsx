import React from 'react';
import icon from '../../../assets/logo/logo.png';

const Footer = () => {
    return (
        <footer className="bg-[#22b7cd] text-white p-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <img src={icon} alt=""  className='w-[100px]'/>
                    <h2 className="text-xl font-bold">PetaDO.com</h2>
                    <p className="mt-2">Your Trusted Online Pet adoption site</p>
                </div>
                <div>
                    <h6 className="text-lg font-semibold">Our Services</h6>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#" className="hover:underline">Prescription Refill</a></li>
                        <li><a href="#" className="hover:underline">Health Consultation</a></li>
                        <li><a href="#" className="hover:underline">Free Delivery</a></li>
                        <li><a href="#" className="hover:underline">Discount Packages</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-lg font-semibold">Quick Links</h6>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                        <li><a href="#" className="hover:underline">FAQs</a></li>
                        <li><a href="#" className="hover:underline">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-lg font-semibold">Legal</h6>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Return Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-8 text-sm">
                <p>&copy; {new Date().getFullYear()} MediCare Online. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

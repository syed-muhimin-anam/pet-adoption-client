import React from 'react';
import dogImage from '../../assets/call to action/dog.png'; 
import morePet from '../../assets/call to action/morePet.png'; 
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
    return (
        <div
            className="relative bg-fixed bg-cover bg-right-top lg:bg-center bg-no-repeat py-12 px-4 md:px-10 text-white"
            style={{ backgroundImage: `url(${dogImage})` }}
        >
           
                <div className="absolute inset-0 bg-black bg-opacity-70 lg:bg-opacity-60"></div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <img src={morePet} alt="More Pets" className="mx-auto w-24 md:w-48 mb-0 drop-shadow-xl" />
                
                <h2 className="text-2xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-md">
                    Give a Pet a Loving Home ❤️
                </h2>
                
                <p className="text-sm md:text-xl leading-relaxed mb-10 drop-shadow-sm text-gray-100">
                    Every day, countless pets wait in shelters — hoping for warmth, care, and a second chance.
                    By choosing adoption, you’re not just saving a life — you’re gaining a loyal companion,
                    a forever friend, and a heart full of love. Make a difference today. Start your journey with adoption.
                </p>

                <button className="btn bg-[#22b7cd] text-white hover:bg-[#1aa2b6] font-semibold px-6 py-3 rounded-md shadow-lg transition duration-300">
                   <Link to={'donation'}>
                    Start Your Adoption Journey</Link>
                </button>
            </div>
        </div>
    );
};

export default CallToActionSection;

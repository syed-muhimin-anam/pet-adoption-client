import React from 'react';
import aboutImage from '../../assets/logo/logo.png'; 

const AboutUsSection = () => {
    return (
        <div className="bg-[#FFF7EC] py-10 px-4 md:px-10">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center ">
                
   
                <div className='w-fit'>
                    <img 
                        src={aboutImage} 
                        alt="About Us" 
                        className="rounded-lg shadow-lg w-[60%] h-auto object-cover"
                    />
                </div>

            
                <div className=''>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#22b7cd] mb-6">
                        About Us
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        Our mission is simple — to connect loving families with pets who need a forever home. 
                        This platform is designed to make the adoption process smoother, more transparent, and accessible to everyone.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        Whether you're looking to adopt, browse through different breeds, or learn more about pet care,
                        our website provides all the tools and information you need in one place.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We believe every pet deserves a second chance — and every person deserves the joy a pet brings. 
                        Join us in making lives better — one adoption at a time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;

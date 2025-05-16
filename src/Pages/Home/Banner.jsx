import { Link } from 'react-router-dom';
import banner from '../../assets/banner/banner1.png';

const Banner = () => {
    return (
        <div
            className="flex items-center justify-start h-[250px] md:h-[450px] mt-[64px]  lg:mt-[65px] relative"
            style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            
            <div className="absolute inset-0 bg-black bg-opacity-60 md:bg-opacity-40"></div>

            <div className="hero-content justify-start items-center text-neutral-content z-10 ml-4 md:ml-16">
                <div className="md:max-w-2xl">
                    <h1 className="mb-5 text-xl md:text-6xl font-extrabold text-white drop-shadow-lg">
                        Find Your New Best Friend 🐈🐇🐹
                    </h1>
                    <p className="mb-6 text-sm md:text-xl text-white">
                        Adopt a loving pet and give them the forever home they deserve. Every paw has a story—make it part of yours.
                    </p>
                    <button className="btn text-xs md:text-base bg-[#FFF7EC] text-[#22b7cd] hover:bg-[#22b7cd] hover:text-[#FFF7EC]   font-semibold px-3 py-1  md:px-6  md:py-2 rounded-lg shadow-md">
                       <Link
                        to="/pet"
                       
                    >
                        Adopt Now
                    </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    // const [availeble, setAvaileble] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/category')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    return (
        <div className="container mx-auto py-12 px-4 w-10/12 ">
            <h2 className="text-2xl  md:text-4xl font-bold text-center text-[#22b7cd] mb-10">Pet Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2   lg:grid-cols-4 gap-8">
                {categories.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#FFF7EC] border rounded-sm overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col md:h-[380px]"
                    >
                        <img
                            src={item.image}
                            alt={item.categoryName}
                            className="w-full h-32 object-cover"
                        />
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold text-[#22b7cd] mb-1">{item.categoryName}</h3>
                            <p className="text-gray-600 text-sm mb-1 line-clamp-2">{item.description}</p>
                            {/* <p className="text-[#22b7cd] font-medium text-sm">Available: {item.availability}</p> */}
                            <div className="mt-2">
                                <p className="text-xs text-gray-500">Popular Breeds:</p>
                                <ul className="list-disc list-inside text-gray-500 text-xs">
                                    {item.popularBreeds.map((breed, i) => (
                                        <li key={i}>{breed}</li>
                                    ))}
                                </ul>
                            </div>


                            <div className="pt-4">
                                <Link to={`/pet/category/${item.categoryName}`}>
                                    <button className="w-full btn bg-[#22b7cd] text-[#FFF7EC] hover:bg-[#FFF7EC] hover:text-[#22b7cd] font-semibold px-4 py-2 rounded-sm shadow-md text-sm">
                                        View Pets
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CategorySection;

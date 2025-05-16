import { Link } from 'react-router-dom';
import usePet from '../../Hooks/usePet';

const AdoptionRequest = () => {
    const [pets] = usePet();

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-center text-2xl sm:text-4xl font-bold mb-6 sm:mb-10 text-[#22b7cd]">
                Adoption Requests
            </h1>

            {pets.length === 0 ? (
                <p className="text-center text-gray-500 text-lg sm:text-xl">
                    No adoption requests available.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-[700px] w-full bg-white border border-gray-200 text-sm sm:text-base">
                        <thead>
                            <tr className="bg-[#22b7cd] text-white">
                                <th className="py-2 sm:py-3 px-2 sm:px-4 border">#</th>
                                <th className="py-2 sm:py-3 px-2 sm:px-4 border">Image</th>
                                <th className="py-2 sm:py-3 px-2 sm:px-4 border">Category</th>
                                <th className="py-2 sm:py-3 px-2 sm:px-4 border">Name</th>
                                <th className="py-2 sm:py-3 px-2 sm:px-4 border">ID</th>
                                <th className="py-2 sm:py-3 px-2 sm:px-4 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((item, index) => (
                                <tr key={item._id} className="text-center hover:bg-gray-100 transition">
                                    <td className="py-2 px-2 sm:px-4 border">{index + 1}</td>
                                    <td className="py-2 px-2 sm:px-4 border">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded mx-auto"
                                        />
                                    </td>
                                    <td className="py-2 px-2 sm:px-4 border">{item.category}</td>
                                    <td className="py-2 px-2 sm:px-4 border">{item.name}</td>
                                    <td className="py-2 px-2 sm:px-4 border text-xs break-words">{item._id}</td>
                                    <td className="py-2 px-2 sm:px-4 border">
                                        <Link to={`/dashboard/request/${item._id}`}>
                                            <button className="bg-[#22b7cd] text-white hover:bg-[#1ca2b5] px-3 py-1 text-xs sm:text-sm rounded">
                                                See Request
                                            </button>
                                        </Link>
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

export default AdoptionRequest;

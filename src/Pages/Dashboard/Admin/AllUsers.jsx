import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    axios.get('https://medi-care-cerver.vercel.app/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleMakeAdmin = async (id) => {
    try {
      const res = await axios.patch(`https://medi-care-cerver.vercel.app/users/admin/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success!', 'User promoted to Admin!', 'success');
        setUsers(users.map(user =>
          user._id === id ? { ...user, role: 'Admin' } : user
        ));
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#22b7cd]">All Users</h2>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[700px] w-full table-auto border border-gray-300 shadow-sm rounded-lg">
          <thead className="bg-[#22b7cd] text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Profile</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full object-cover" />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-2">{user.role || 'User'}</td>
                <td className="px-4 py-2">
                  {user.role !== 'Admin' ? (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm bg-[#22b7cd] text-white whitespace-nowrap"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">Admin</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;


import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import {
    FaBars, FaCat, FaDonate, FaEdit, FaEnvelopeOpenText,
    FaHome, FaTimes, 
} from 'react-icons/fa';
import { MdListAlt } from 'react-icons/md';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Dashboard = () => {
    const { user,logout } = useContext(AuthContext);
    // const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
      const axiosSecure = useAxiosSecure();
       const navigate = useNavigate();
    //   const { logout } = useContext(AuthContext);
    console.log(isAdmin);
    

    // useEffect(() => {
    //     const checkUserRole = async () => {
    //         if (user?.email) {
    //             try {
    //                 const res = await fetch(`http://localhost:5000/users/email?email=${user.email}`);
    //                 const data = await res.json();
    //                 setIsAdmin(data?.role === 'Admin');
    //             } catch (err) {
    //                 console.error('Error fetching user role:', err);
    //             }
    //         }
    //     };
    //     checkUserRole();
    // }, [user]);


     useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/users/email?email=${user.email}`)
      .then(res => setIsAdmin(res.data.role === 'Admin'))
      .catch(async err => {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          await logout();
          navigate('/login');
        } else {
          console.error(err);
        }
      });
}, [user, axiosSecure, logout, navigate]);






    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'bg-white text-[#03b0c7] font-semibold rounded-lg shadow px-4 py-2 flex items-center gap-3 transition-all duration-200'
            : 'text-white hover:bg-white hover:text-[#03b0c7] px-4 py-2 flex items-center gap-3 rounded-lg transition duration-200';

    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans">
            {/* Mobile Top Navbar */}
            <div className="md:hidden bg-gradient-to-l from-[#00bcd4]  to-[#29d1eb] flex justify-between items-center px-5 py-4 shadow-md sticky top-0 z-50">
                <h2 className="text-white text-2xl font-bold">Dashboard</h2>
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <FaTimes size={22} className="text-white" /> : <FaBars size={22} className="text-white" />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`bg-gradient-to-b from-[#04a5ba] to-[#26c8e1]  w-64 z-40 p-6 transition-all duration-300 md:fixed fixed md:top-0 top-[64px]  ${
                    sidebarOpen ? 'left-0' : '-left-full'
                } md:left-0 h-full md:min-h-screen shadow-lg`}
            >
                <ul className="space-y-3">
                    <NavLink to="/dashboard/addPet" className={navLinkClass}><FaEdit /> Add Pet</NavLink>
                    <NavLink to="/dashboard/myPets" className={navLinkClass}><FaCat /> My Added Pets</NavLink>
                    <NavLink to="/dashboard/adoptionRequest" className={navLinkClass}><FaEnvelopeOpenText /> Adoption Requests</NavLink>
                    <NavLink to="/dashboard/createCampaign" className={navLinkClass}><FaEdit /> Create Campaign</NavLink>
                    <NavLink to="/dashboard/myCampaigns" className={navLinkClass}><MdListAlt /> My Campaigns</NavLink>
                    <NavLink to="/dashboard/myDonations" className={navLinkClass}><FaDonate /> My Donations</NavLink>

                    {isAdmin && (
                        <>
                            <NavLink to="/dashboard/allUsers" className={navLinkClass}><FaUser></FaUser> All Users</NavLink>
                            <NavLink to="/dashboard/allPets" className={navLinkClass}><FaCat /> All Pets</NavLink>
                            <NavLink to="/dashboard/allDonations" className={navLinkClass}><MdListAlt /> All Donations</NavLink>
                        </>
                    )}

                    <NavLink to="/" className={navLinkClass}><FaHome /> Home</NavLink>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:p-6 md:ml-64 lg:bg-[#FFF7EC]  lg:min-h-screen transition-all duration-300">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

import { useContext } from 'react';
import logo from '../../../assets/logo/logo.png'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    console.log('user information', user);
    
    const navigate = useNavigate();
    const handleLogout = () => {
        logout()
            .then(result => {
                // const user = result.user;
                // console.log(user);
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully loggedout!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/');
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });

    }
    
       const items = (
            <>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white md:text-black font-bold underline bg-[#22b7cd] md:bg-[#FFF7EC]"
                                : "text-black md:text-[#FFF7EC] font-bold"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/pet"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white md:text-black font-bold underline bg-[#22b7cd] md:bg-[#FFF7EC]"
                                : "text-black md:text-[#FFF7EC] font-bold"
                        }
                    >
                        Listing
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/donation"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white md:text-black font-bold underline bg-[#22b7cd] md:bg-[#FFF7EC]"
                                : "text-black md:text-[#FFF7EC] font-bold"
                        }
                    >
                        Donation
                    </NavLink>
                </li>
            </>

    );
return (
    <div className="navbar bg-[#22b7cd]  fixed top-0 z-20 md:px-14">
        <div className="navbar-start">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    {
                        items
                    }
                </ul>
            </div>
            <div className="flex items-center "><img src={logo} alt="" srcset="" className="w-[25%] md:w-[15%] lg:w-[10%]" />
                <h1 className="text-[#FFF7EC] text-xl font-bold">Petado</h1></div>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                {
                    items
                }
            </ul>
        </div>
        <div className="navbar-end">
            {
                user ? <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoURL} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-1">


                        <Link to={'/dashboard'}><li className=' btn btn-xs md:btn w-full'>Dashboard</li></Link>
                        <li onClick={handleLogout} className='btn btn-xs md:btn'>Logout</li>
                    </ul>
                </div> : <Link to={'/login'} className=" border  btn btn-xs md:btn bg-[#FFF7EC] text-[#22b7cd] font-bold">Login</Link>
            }


        </div>
    </div>
);
};

export default Navbar;

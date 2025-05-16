// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../providers/AuthProvider';
// import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const AdminRoute = ({ children }) => {
//   const { user, loading, logOut } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isAdmin, setIsAdmin] = useState(null);
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     const checkAdminRole = async () => {
//       if (user?.email) {
//         try {
//           const res = await fetch(`http://localhost:5000/users/email?email=${user.email}`);
//           const data = await res.json();
//           if (data?.role === 'Admin') {
//             setIsAdmin(true);
//           } else {
//             setIsAdmin(false);
//             setChecking(false);
//             // Wait before showing alert and redirect
//             setTimeout(() => {
//               Swal.fire({
//                 icon: 'error',
//                 title: 'Access Denied',
//                 text: 'You are not an admin!',
//                 confirmButtonColor: '#d33',
//                 confirmButtonText: 'Go Home'
//               }).then(async () => {
//                 try {
//                   await logOut(); // ensure logOut is awaited
//                   navigate('/', { replace: true });
//                 } catch (err) {
//                   console.error('Logout failed:', err);
//                 }
//               });
//             }, 100); // small delay ensures UI is mounted
//           }
//         } catch (err) {
//           console.error('Failed to fetch user role:', err);
//           setIsAdmin(false);
//           setChecking(false);
//         } finally {
//           if (isAdmin !== false) setChecking(false); // skip if already handled
//         }
//       } else {
//         setChecking(false);
//       }
//     };

//     checkAdminRole();
//   }, [user, logOut, navigate]);

//   if (loading || checking) {
//     return <p className='text-2xl text-center text-blue-600'>Checking permissions...</p>;
//   }

//   if (user && isAdmin) {
//     return children;
//   }

//   return null; // avoid rendering if not admin
// };

// export default AdminRoute;

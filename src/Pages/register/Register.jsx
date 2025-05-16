import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import regImg from '../../assets/log reg/group-happy-dogs-pose-outdoors-natural-mountain-setting_975188-132624.jpg';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const { createUser } = useContext(AuthContext);




    // const onSubmit = data => {
    //     createUser(data.email, data.password)
    //         .then(result => {
    //             const saveUser = {
    //                 displayName: data.name,
    //                 email: data.email,
    //                 photo: data.image,
    //                 role: 'user'
    //             };

    //             fetch('http://localhost:5000/users', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify(saveUser)
    //             })
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     console.log('DB response:', data); // for debugging

    //                     if (data.insertedId || data.message === 'user already exists') {
    //                         Swal.fire({
    //                             icon: 'success',
    //                             title: 'Registration Successful',
    //                             text: 'User has been saved!',
    //                             timer: 1500,
    //                             showConfirmButton: false
    //                         }).then(() => navigate('/'));
    //                     } else {
    //                         Swal.fire({
    //                             icon: 'error',
    //                             title: 'Database Error',
    //                             text: 'User could not be saved.',
    //                         });
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     console.error('Fetch error:', err);
    //                     Swal.fire({
    //                         icon: 'error',
    //                         title: 'Error!',
    //                         text: 'Failed to save user info.',
    //                     });
    //                 });
    //         })
    //         .catch(error => {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Registration Failed',
    //                 text: error.message,
    //             });
    //         });
    // };
    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const saveUser = {
                    name: data.name,
                    email: data.email,
                    photoURL: data.image,
                    role: 'user',
                };

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(dbData => {
                        console.log('DB response:', dbData);

                        if (dbData.insertedId || dbData.message === 'user already exists') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Registration Successful',
                                text: 'User has been saved!',
                                timer: 1500,
                                showConfirmButton: false
                            }).then(() => navigate('/'));
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Database Error',
                                text: 'User could not be saved.',
                            });
                        }
                    })
                    .catch(err => {
                        console.error('Fetch error:', err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to save user info.',
                        });
                    });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message,
                });
            });
    };






    return (
        <div className="min-h-screen flex items-center justify-center pt-[70px] bg-[#22b7cd] px-4">
            <div className="bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row w-full max-w-5xl overflow-hidden">




                <div className="lg:w-1/2 p-8">
                    <h3 className="text-3xl font-semibold text-[#075e69] mb-6 text-center">Create a new account</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22b7cd]"
                                placeholder="Your Name"
                            />
                            {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Photo URL</label>
                            <input
                                type="text"
                                {...register("image", { required: true })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22b7cd]"
                                placeholder="Photo URL"
                            />
                            {errors.image && <span className="text-red-500 text-sm">Photo URL is required</span>}
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22b7cd]"
                                placeholder="Email Address"
                            />
                            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                {...register("password", { required: true, minLength: 6 })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22b7cd]"
                                placeholder="Password"
                            />
                            {errors.password && <span className="text-red-500 text-sm">Password must be at least 6 characters</span>}
                        </div>

                        <div className="text">
                            <a href="#" className="text-sm text-[#22b7cd] hover:underline">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#22b7cd] text-white py-2 rounded-lg hover:bg-[#1aa6b8] transition duration-200"
                        >
                            Register
                        </button>

                    </form>

                    <p className="text-center mt-6 text-sm">
                        Already have an account? <Link to="/login" className="text-[#22b7cd] font-semibold hover:underline">Login</Link>
                    </p>
                </div>



                <div className="lg:w-1/2 p-10 flex flex-col justify-center bg-[#e0f7fb]">
                    <h2 className="text-4xl font-bold text-[#075e69]">Join Us!</h2>
                    <p className="mt-4 text-gray-700">
                        Register now to adopt a pet, start a campaign, or make a donation. Your journey begins here.
                    </p>
                    <img
                        src={regImg}
                        alt="Register Cat"
                        className="mt-6 w-full max-w-lg mx-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;

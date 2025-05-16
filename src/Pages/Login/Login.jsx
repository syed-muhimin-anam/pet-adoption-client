import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import regImg from '../../assets/log reg/group-happy-dogs-pose-outdoors-natural-mountain-setting_975188-132624.jpg';
import { FaGoogle } from 'react-icons/fa6';

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        googleLogin()
            .then(async (res) => {
                const user = res.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    role: 'User',
                };

                try {
                    // Check if user already exists
                    const response = await axios.get(`http://localhost:5000/users/${user.email}`);
                    if (!response.data) {
                        // If user doesn't exist, add to DB
                        await axios.post('http://localhost:5000/users', userInfo);
                    }
                } catch (error) {
                    console.error('Error checking or saving user:', error);
                }

                Swal.fire({
                    title: 'Welcome!',
                    text: `Logged in as ${user.displayName}`,
                    icon: 'success',
                    confirmButtonText: 'Continue',
                    confirmButtonColor: '#22b7cd',
                }).then(() => {
                    navigate(from);
                });
            })
            .catch((error) => {
                Swal.fire('Error', error.message, 'error');
            });
    };


    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(() => {
                Swal.fire('Success!', 'Successfully logged in!', 'success').then(() => {
                    navigate(from, { replace: true });
                });
            })
            .catch((error) => {
                Swal.fire('Error!', error.message, 'error');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#22b7cd] px-4">
            <div className="bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row w-full max-w-5xl overflow-hidden">
                {/* Left Side Content */}
                <div className="lg:w-1/2 p-10 flex flex-col justify-center bg-[#e0f7fb]">
                    <h2 className="text-4xl font-bold text-[#075e69]">Welcome Back!</h2>
                    <p className="mt-4 text-gray-700">
                        Log in to access your account and explore all features of our pet adoption platform.
                    </p>
                    <img
                        src={regImg}
                        alt="Register Cat"
                        className="mt-6 w-full max-w-lg mx-auto"
                    />
                </div>

                {/* Right Side Form */}
                <div className="lg:w-1/2 p-8">
                    <h3 className="text-3xl font-semibold text-[#075e69] mb-6 text-center">Login to your account</h3>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" name="email" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22b7cd]" />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" name="password" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22b7cd]" />
                        </div>
                        <div className="text">
                            <a href="#" className="text-sm text-[#249db0] hover:underline">Forgot password?</a>
                        </div>
                        <button type="submit" className="w-full bg-[#22b7cd] text-white py-2 rounded-lg hover:bg-[#1aa6b8] transition duration-200">
                            Login
                        </button>
                    </form>

                    <div className="my-4 text-center text-gray-500">or</div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <FaGoogle className='text-xl font-bold'></FaGoogle>
                        Continue with Google
                    </button>

                    <p className="text-center mt-6 text-sm">
                        New here? <Link to="/register" className="text-[#22b7cd] font-semibold hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

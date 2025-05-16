import axios from "axios";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;





// // useAxiosSecure.js
// import { useEffect } from "react";
// import axios from "axios";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:5000",
// });

// const useAxiosSecure = () => {
//   useEffect(() => {
//     const requestInterceptor = axiosSecure.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem("access-token");
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     return () => {
//       axiosSecure.interceptors.request.eject(requestInterceptor);
//     };
//   }, []);

//   return axiosSecure;
// };

// export default useAxiosSecure;

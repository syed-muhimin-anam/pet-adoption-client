import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosSecure from "../Hooks/useAxiosSecure";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";


export const AuthContext = createContext(null);

const auth = getAuth(app);



const AuthProvider = ({ children }) => {

    const exiosSecure = useAxiosSecure();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create useer 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // Google Sign-in
    const googleLogin = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // login user

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout 
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                exiosSecure.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }

            setLoading(false)
        });
        return () => {
            return unsubscribe();
        }
    }, [exiosSecure])


    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logout,
        googleLogin




    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
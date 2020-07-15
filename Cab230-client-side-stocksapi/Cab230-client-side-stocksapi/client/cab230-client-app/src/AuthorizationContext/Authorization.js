import React, { createContext, useState, useContext } from 'react';
import { ValidateLogin, RegisterUser } from '../API';

const AuthContext = createContext();

// Through context, this method enables each children of the Auth provider to have access to: isAuthenticated, Login,
// Logout, Register.
export const useAuthorization = () => useContext(AuthContext);

// Authorization provider component aims to provide the authentication process methods
// for main APP in index.js,
function AuthorizationProvider({ children }){
    // Check main state whether a user is authenticated or unauthenticated
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);

    const Register = async (email, password) => {
        await RegisterUser(email, password);
    };
    const Login = async (email, password) => {
        const token = await ValidateLogin(email, password);
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };
    const Logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        alert("You have successfully logged out")
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, Login, Logout, Register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthorizationProvider;

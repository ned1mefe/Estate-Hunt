import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        userId: null,
        fullName: null,
        phoneNumber: null,
        eMail: null,
        roles: []
    });

    const updateAuthState = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setAuthState({
                    userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
                    fullName: decodedToken["name"],
                    phoneNumber: decodedToken["phone_number"],
                    eMail: decodedToken["sub"],
                    roles: Array.isArray(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
                        ? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                        : [decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]],
                });
            } catch (error) {
                console.error("Failed to decode JWT:", error);
                setAuthState({
                    userId: null,
                    roles: []
                });
            }
        } else {
            setAuthState({
                userId: null,
                roles: []
            });
        }
    };

    useEffect(() => {
        updateAuthState();
    }, []);


    return (
        <AuthContext.Provider value={{ ...authState, updateAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

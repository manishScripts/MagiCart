import React from 'react';
import { createContext } from 'react';
export const authDataContext = createContext();
const AuthContext = ({children}) => {
    let serverValue = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
    let value = {
        serverValue
    };
    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}
export default AuthContext;
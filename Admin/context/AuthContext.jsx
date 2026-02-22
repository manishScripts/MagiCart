import React from 'react';
import { createContext } from 'react';
export const authDataContext = createContext();
const AuthContext = ({children}) => {
    let serverValue = "http://localhost:5000";
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
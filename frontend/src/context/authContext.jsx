import React from "react";
import { createContext } from "react";
export const authDataContext = createContext();   // create context

export function AuthContext({children}) {
    let serverValue = "http://localhost:5000"
    let value = {
        serverValue
    }
    return (
        <div>
            <authDataContext.Provider value = {value}>
                {children}
            </authDataContext.Provider>

        </div>
    )

}


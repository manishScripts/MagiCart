import  { useEffect, createContext, useContext, useState, useCallback } from "react";
import { authDataContext } from "./authContext.jsx";
import axios from "axios";

export const userDataContext = createContext();

export const UserContext = ({ children }) => {
    const { serverValue } = useContext(authDataContext);
    const [userdata, setUserdata] = useState(null);

    // Using useCallback to prevent the function from being recreated every render
    const getcurrentUser = useCallback(async () => {
        try {
            const result = await axios.get(`${serverValue}/api/user/profile`, { 
                withCredentials: true 
            });
            console.log("current user data", result.data);
            setUserdata(result.data);
        } catch (error) {
            console.log("error in fetching current user", error);
            setUserdata(null);
        }
    }, [serverValue]); // Only recreate if serverValue changes

    useEffect(() => {
        if (serverValue) {
            getcurrentUser();
        }
    }, [getcurrentUser]); // Now this is safe

    const userValue = {
        userdata,
        setUserdata,
        getcurrentUser
    };

    return (
        <userDataContext.Provider value={userValue}>
            {children}
        </userDataContext.Provider>
    );
};

export default UserContext;

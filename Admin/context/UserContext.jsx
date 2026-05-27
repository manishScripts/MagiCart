import React from 'react'
import { createContext , useContext , useState , useEffect } from 'react';
import { authDataContext } from './AuthContext.jsx';
import axios from 'axios';
export const userDataContext = createContext();
const UserContext = ({children}) => {
  const {serverValue} = useContext(authDataContext);
  const [userData, setUserData] = useState(null);
  
  const getAdmin = React.useCallback(async () => {
    try {
      let result = await axios.get(`${serverValue}/api/user/adminProfile`,{withCredentials: true})
      console.log("admin data", result.data);
      setUserData(result.data);
    } catch (error) {
      console.log("error in fetching admin", error);
      setUserData(null);
    }
  }, [serverValue]);

  useEffect(() => {
    if(serverValue){
      getAdmin();
    }
  }, [getAdmin, serverValue]);

   let value = {
    setUserData,
    userData,
    getAdmin
   }
    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext;

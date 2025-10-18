import { createContext, useState } from "react";

export const AdminContext = createContext();

// Create the provider component
const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // Define the values you want to provide
  const value = {
    aToken,setAToken,
    backendUrl
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
import { createContext, useState, useEffect } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  
  // Load from localStorage ONCE
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") || ""
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Sync with localStorage whenever dToken changes
  useEffect(() => {
    if (dToken) {
      localStorage.setItem("dToken", dToken);
    } else {
      localStorage.removeItem("dToken");
    }
  }, [dToken]);

  const value = {
    dToken,
    setDToken,
    backendUrl
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
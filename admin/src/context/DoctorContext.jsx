
import { createContext } from "react";

// Create the context
export const DoctorContext = createContext();

// Create the provider component
const DoctorContextProvider = (props) => {
  // Define the values you want to provide
  const value = {
    // example: user: null,
    // example: setUser: () => {},
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
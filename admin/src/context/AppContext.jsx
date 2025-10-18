import { createContext } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider component
const AppContextProvider = (props) => {
  // Define the values you want to provide
  const value = {
    // example: user: null,
    // example: setUser: () => {},
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
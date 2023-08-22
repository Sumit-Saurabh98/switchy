import React, { useState, createContext } from 'react';

export const ToggleTheme = createContext(); 

function ToggleThemeProvider({ children }) {
  const [myTheme, setTheme] = useState(true);

  const changeTheme = () => {
    setTheme(!myTheme);
  };

  const value = { myTheme, changeTheme };
  return (
    <ToggleTheme.Provider value={value}>
      {children}
    </ToggleTheme.Provider>
  );
}

export default ToggleThemeProvider;

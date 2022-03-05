import React from "react";

const AppContext = React.createContext();

function AppProvider(props) {

	return (
    <AppContext.Provider
      value={{
				value
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export {AppContext,AppProvider };
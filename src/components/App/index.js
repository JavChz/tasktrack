import React from "react";
import { AppProvider } from "../AppContext";
import { AppUI } from "./AppUI";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <AppUI />
    </AppProvider>
  );
}

export default App;

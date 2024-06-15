import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <>
      <Routes>
        
        <Route path="/tuananhafjdjhv-mobile-app/login" Component={Login} />
        <Route
          Component={Register}
          path="/tuananhafjdjhv-mobile-app/register"
        />
      </Routes>
      {/* <Login></Login>
      <Register></Register> */}
    </>
  );
}

export default App;

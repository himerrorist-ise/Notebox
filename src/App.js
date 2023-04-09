import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import PrivateRoute from './PrivateRoute';
import Header from "./Components/Header/Header";
import Notes from "./Components/Notes/Notes";
import AddNote from "./Components/Notes/AddNote"
import ContextProvider from "./Config/ContextProvider";
import { Helmet, HelmetProvider } from 'react-helmet-async';


function App() {

  return (
      <ContextProvider>
        <HelmetProvider>
          <div>
            <Helmet titleTemplate="%s"></Helmet>
            <Router>
              <Header />
              <Routes>
                <Route exact path="/" element={<PrivateRoute path="/" Component={Home} />} />
                <Route path="/Home" element={<PrivateRoute path="/Home" Component={Home} />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Notes" element={<PrivateRoute path="/Notes" Component={Notes} />} />
                <Route path="/Notes/AddNote" element={<PrivateRoute path="/Notes/AddNote" Component={AddNote} />} />
                {/* <Route path="/home" element={<Home />} /> */}
              </Routes>
            </Router>
          </div>
        </HelmetProvider>
      </ContextProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/home" element={<PrivateRoute path="/home" Component={Home} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

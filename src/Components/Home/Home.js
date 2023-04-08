import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        //Sign-out user success
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <div>
      <h1>Welcome Home</h1>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
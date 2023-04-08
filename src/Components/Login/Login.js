import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const handleLogin = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      })
  };

  return (
    <div>
      <h1>Notebox</h1>
      <form>
        <div>
            <label htmlFor="email-address">Email Address</label>
            <input type="email" label="Email address" value={data.email}
              onChange={(e) => setData({...data, ["email"]:e.target.value})}
              required placeholder="Email address" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" lable="Create password" value={data.password}
              onChange={(e) => setData({...data, ["password"]:e.target.value})}
              required placeholder="Password" />
          </div>
          <button onClick={handleLogin}>Login</button>
      </form>

      <p className="text-sm text-white text-center">
        No account yet? {" "}
        <NavLink to="/Signup">Sign up</NavLink>
      </p>
    </div>
  );
}

export default Login;
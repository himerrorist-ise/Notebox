import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        //Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code, error.message);
      })
  }

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
        <button type="submit" onClick={handleSubmit}>Sign Up</button>
      </form>

      <p>
        Already have an account?{" "}
        <NavLink to="/login">Sign In</NavLink>
      </p>
    </div>
  );
}

export default Signup;
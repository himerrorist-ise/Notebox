import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Grid, FormControl, TextField, InputLabel, Button, InputAdornment } from "@mui/material";
import {ReactComponent as Logo} from "../../Assests/binghamton_logo.svg";
import SvgIcon from '@mui/material/SvgIcon';
import { AppContext } from "../../Config/ContextProvider";

const Login = () => {
  const {setUserData} = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const handleLogin = async (e) => {
    e.preventDefault();
    let temp = {...data};
    temp.email = temp.email + "@binghamton.edu";

    await signInWithEmailAndPassword(auth, temp.email, temp.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        setUserData({...user});
        navigate("/Home");
      })
      .catch((error) => {
        // console.log(error.code, error.message);
        alert("Invalid Email or Password!!!");
      })
  };

  return (
    <form className="container" onSubmit={handleLogin}>
      <Box sx={{width:"100%", marginTop:"4em"}}/* sx={{position:"absolute", top:"50%", left:"50%", width:"300px", height:"400px", transform : "translate(-50%, -50%)"}} */>
        <Grid container rowSpacing={5} columnSpacing={{xs:1, sm:2, md:3}}>
          <Grid item xs={12} sx={{marginBottom:"-10px", marginLeft:"-10px"}}>
            <InputLabel>
              <SvgIcon sx={{width:"100px", height:"70px",}}><Logo/></SvgIcon>NOTEBOX
            </InputLabel>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField id="email" label="Email" required
                InputProps={{endAdornment:<InputAdornment position="end">@binghamton.edu</InputAdornment>}}
                value={data.email} onChange={e => setData({...data, "email":e.target.value})} />
            </FormControl>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField id="password" label="Password"  type="password" required
                value={data.password} onChange={e => setData({...data, "password":e.target.value})} />
            </FormControl>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ paddingTop: 30 }}
          >
              <Button
                  type="submit"
                  color="info"
                  variant="contained"
                  sx={{marginBottom:"1em", width:"6.5em"}}
              >
                  Login
              </Button>
              <InputLabel>or</InputLabel>
              <Button
                  type="button"
                  color="info"
                  variant="contained"
                  sx={{marginTop:"1em", width:"6.5em"}}
              >
                  <NavLink className="text-white text-decoration-none" to="/Signup">Signup</NavLink>
              </Button>
          </Grid>
        </Grid>
      </Box>

    </form>
  );
}

export default Login;
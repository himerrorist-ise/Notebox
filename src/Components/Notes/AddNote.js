import React, { useState } from "react";
import { Grid, Box, InputLabel, TextField, Button } from "@mui/material";
import { db } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDocs } from "firebase/firestore";


const AddNote = () =>{

  const navigate = useNavigate();

  const [data, setData] = useState({
    Title: "",
    Code: "",
    Instructor: "",
    LinkUrl: "",
    Year: "",
    Term: "",
    Description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "Notes"), data);
    setData({
      Title: "",
      Code: "",
      Instructor: "",
      LinkUrl: "",
      Year: "",
      Term: "",
      Description: "",
    });
    navigate("/Notes");
    
    const usersRef = collection(db, 'users');
    const authE = await getDocs(usersRef);
    const emails = [];
    authE.forEach((doc) => {
      emails.push(doc.data().email);
    });

    const data = {
      to: emails,
    };

    const curlData = JSON.stringify({
      ...data,
      subject: "Notebox",
      body: "<p>New Notes Have Been Added to your Courses!</p>"
    });
    
    const response = await fetch('https://us-central1-email-384816.cloudfunctions.net/gmail-bulk-send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(curlData)
    });
    
  }

  return(
    <form className="container w-50" onSubmit={handleSubmit}>
      <Box sx={{width:"100%", marginTop:"6em"}}>
        <Grid className="border border-success" container rowSpacing={5} columnSpacing={{xs: 1, sm: 2, md: 3}}>
          <Grid item xs={12} className="bg-success p-3" >
            <InputLabel className="text-white">Share Note</InputLabel>
          </Grid>
          <Grid container className="p-4" rowSpacing={5} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item xs={12}>
              <TextField fullWidth label="Title" value={data.Title}
                onChange={e => setData({...data, "Title":e.target.value})} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Code" value={data.Code}
                onChange={e => setData({...data, "Code":e.target.value})} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Instructor" value={data.Instructor}
                onChange={e => setData({...data, "Instructor":e.target.value})} />
            </Grid><Grid item xs={12}>
              <TextField fullWidth label="Drive Link" value={data.LinkUrl}
                onChange={e => setData({...data, "LinkUrl":e.target.value})} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Term" value={data.Term}
                onChange={e => setData({...data, "Term":e.target.value})} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Year" value={data.Year}
                onChange={e => setData({...data, "Year":e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="success" >
                Share Note
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  );

}

export default AddNote;

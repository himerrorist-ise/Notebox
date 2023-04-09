import React, { useState } from "react";
import { Grid, Box, InputLabel, TextField, Button } from "@mui/material";

const AddNote = () =>{

  const [data, setData] = useState({
    Title: "",
    Code: "",
    Instructer: "",
    LinkUrl: "",
    Year: "",
    Term: "",
    Description: "",
  });

  const handleSubmit = () => {

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
              <TextField fullWidth label="Instructer" value={data.Instructer}
                onChange={e => setData({...data, "Instructer":e.target.value})} />
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
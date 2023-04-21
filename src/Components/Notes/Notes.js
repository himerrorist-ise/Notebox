import { useState, useEffect } from "react";
import {Box, Grid, Table, TableHead, TableContainer,
    TableBody, TableRow, TableCell, TextField, Paper } from "@mui/material";
import Alert from 'react-bootstrap/Alert';
import { collection, doc, query, onSnapshot  } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ShortcutIcon from '@mui/icons-material/Shortcut';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedInstructer, setSelectedInstructer] = useState("");

  const handleChange = (e) => {

  };

  useEffect(() => {
    const qu = query(collection(db, "Notes"));
    const r = onSnapshot(qu, (res) => {
      let temp = [];
      res.forEach((doc) => {
        temp = [...temp, doc.data()];
      });
      // console.log(temp);
      setNotes(temp);
    });
    return () => r();
  }, []);

  return (
    <div className="container w-70">
    <Box sx={{width:"100%", marginTop:"1em", padding:"3em"}}>
      <Grid container rowSpacing={5} columnSpacing={{xs: 1, sm: 2, md: 3}}>
        <Grid item xs={3}>
          <TextField fullWidth label="Code" id="Code"
            value={selectedCode} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="Instructer" id="Instructer"
            value={selectedInstructer} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table size="small" className="table table-bordered table-hover table-responsive-md">
              <colgroup>
                <col style={{width: "5%"}}></col>
                <col style={{width: "45%"}}></col>
                <col style={{width: "10%"}}></col>
                <col style={{width: "20%"}}></col>
                <col style={{width: "15%"}}></col>
                <col style={{width: "5%"}}></col>
              </colgroup>
              <TableHead className="bg-success">
                <TableRow>
                  <TableCell scope="col" className="text-white">#</TableCell>
                  <TableCell scope="col" className="text-white">Title</TableCell>
                  <TableCell scope="col" className="text-white">Code</TableCell>
                  <TableCell scope="col" className="text-white">Instructer</TableCell>
                  <TableCell scope="col" className="text-white">Term / Year</TableCell>
                  <TableCell scope="col" className="text-white">Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.length === 0 ?
                  (<TableRow>
                    <TableCell colSpan={6}>
                      <Alert key={"info"} variant={"info"}>
                        No Records Found!
                      </Alert>
                    </TableCell>
                  </TableRow>) :
                  notes.map((e, i) => 
                    <TableRow key={i}>
                      <TableCell>{i+1}</TableCell>
                      <TableCell>{e.Title}</TableCell>
                      <TableCell>{e.Code}</TableCell>
                      <TableCell>{e.Instructor}</TableCell>
                      <TableCell>{e.Term} {e.Year}</TableCell>
                      <TableCell><a href={e.LinkUrl} target="_blank"><ShortcutIcon /></a></TableCell>
                    </TableRow>
                  
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}

export default Notes;
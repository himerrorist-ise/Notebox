import React, { useState, useEffect } from "react";
import {
  Box, Grid, Table, TableHead, TableContainer,
  TableBody, TableRow, TableCell, TextField, Paper, Button
} from "@mui/material";
import Alert from 'react-bootstrap/Alert';
import { collection, doc, query, onSnapshot  } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ShortcutIcon from '@mui/icons-material/Shortcut';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedInstructer, setSelectedInstructer] = useState("");

  const handleChangeCode = (e) => {
    setSelectedCode(e.target.value);
  };

  const handleChangeIns = (e) => {
    setSelectedInstructer(e.target.value);
  }

  const handleFilter = (e) => {
    if (selectedCode != "" && selectedInstructer != ""){
      setFilteredNotes(notes.filter((el) => el.Code.includes(selectedCode) && el.Instructor.includes(selectedInstructer)));
    }
    else if (selectedCode != "" && selectedInstructer == ""){
      setFilteredNotes(notes.filter((el) => el.Code.includes(selectedCode) ));
    }
    else if (selectedCode == "" && selectedInstructer != ""){
      setFilteredNotes(notes.filter((el) => el.Instructor.includes(selectedInstructer) ));
    }
    else{
      setFilteredNotes([...notes]);
    }
  }

  useEffect(() => {
    const qu = query(collection(db, "Notes"));
    const r = onSnapshot(qu, (res) => {
      let temp = [];
      res.forEach((doc) => {
        temp = [...temp, doc.data()];
      });
      // console.log(temp);
      setNotes(temp);
      setFilteredNotes(temp);
    });
    return () => r();
  }, []);

  return (
    <div className="container w-70">
    <Box sx={{width:"100%", marginTop:"1em", padding:"3em"}}>
      <Grid container rowSpacing={5} columnSpacing={{xs: 1, sm: 2, md: 3}}>
        <Grid item xs={3}>
          <TextField fullWidth label="Code" id="Code"
            value={selectedCode} onChange={handleChangeCode} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="Instructer" id="Instructer"
            value={selectedInstructer} onChange={handleChangeIns} />
        </Grid>
        <Grid item xs={3}>
          <Button type="button" variant="contained" color="success" onClick={(e) => handleFilter(e)}>
            Filter
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button type="button" variant="contained" color="success" onClick={() => {
            setFilteredNotes([...notes]);
            setSelectedInstructer("");
            setSelectedCode("");
          }}>
            Reset Filter
          </Button>
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
                {filteredNotes.length === 0 ?
                  (<TableRow>
                    <TableCell colSpan={6}>
                      <Alert key={"info"} variant={"info"}>
                        No Records Found!
                      </Alert>
                    </TableCell>
                  </TableRow>) :
                  filteredNotes.map((e, i) =>
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
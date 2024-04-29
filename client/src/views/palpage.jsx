import React, { useState, useEffect } from "react";
import Nav from "../components/nav.jsx";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  createTheme,
  ThemeProvider,
  Paper,
  TableContainer,
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const PalDetails = (props) => {
  const [pal, setPal] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pals/${id}`)
      .then((res) => {
        setPal(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:8000/api/pals/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Nav title={pal.name} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Partner Skill</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Discovered</TableCell>
                <TableCell>Captured</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={pal._id}>
                <TableCell>{pal.name}</TableCell>
                <TableCell>{pal.numericId}</TableCell>
                <TableCell>{pal.partnerSkill}</TableCell>
                <TableCell>{pal.type}</TableCell>
                <TableCell>{pal.color}</TableCell>
                <TableCell>{pal.isDiscovered ? "Yes" : "No"}</TableCell>
                <TableCell>{pal.isCaptured ? "Yes" : "No"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button style={{ marginTop: "20px" }} onClick={deleteHandler}>
          Delete {pal.name}
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default PalDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

import {
  createTheme,
  ThemeProvider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Link,
  Select,
  Box,
  TextField,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const DisplayAll = (props) => {
  const [pals, setPals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("Name");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pals")
      .then((res) => {
        setPals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredPals = pals.filter((pal) => {
    if (!searchTerm) return true;

    if (searchFilter === "ID") {
      return pal.numericId.toString().includes(searchTerm);
    } else if (searchFilter === "Type" || searchFilter === "Color") {
      return pal[searchFilter.toLowerCase()]
        .join(", ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    } else {
      return pal[searchFilter.toLowerCase()]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <div>
          <Box sx={{ minWidth: 120 }} style={{ marginBottom: "20px" }}>
            <TextField
              id=""
              label="Search"
              title="Type in a name"
              defaultValue=""
              type="text"
              onChange={handleSearchChange}
              placeholder={`Search by ${searchFilter}`}
            />

            <FormControl>
              <InputLabel>Name</InputLabel>
              <Select
                value={searchFilter}
                label="search"
                onChange={handleFilterChange}
              >
                <MenuItem value={"Name"}>Name</MenuItem>
                <MenuItem value={"ID"}>ID</MenuItem>
                <MenuItem value={"Type"}>Type</MenuItem>
                <MenuItem value={"Color"}>Color</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPals.map((pal) => (
                <TableRow key={pal._id}>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/pals/${pal._id}/palpage`}
                      underline="none"
                    >
                      {pal.name}
                    </Link>
                  </TableCell>
                  <TableCell>{pal.numericId}</TableCell>
                  <TableCell>{pal.partnerSkill}</TableCell>
                  <TableCell>{pal.type.join(", ")}</TableCell>
                  <TableCell>{pal.color.join(", ")}</TableCell>
                  <TableCell>{pal.isDiscovered ? "Yes" : "No"}</TableCell>
                  <TableCell>{pal.isCaptured ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/pals/${pal._id}/edit`}
                      underline="none"
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
};

export default DisplayAll;

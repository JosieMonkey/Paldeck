import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/nav.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Edit = (props) => {
  const [name, setName] = useState("");
  const [numericId, setNumericId] = useState("");
  const [partnerSkill, setPartnerSkill] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [isDiscovered, setIsDiscovered] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);

  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pals/${id}`)
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setNumericId(res.data.numericId);
        setPartnerSkill(res.data.partnerSkill);
        setType(res.data.type);
        setColor(res.data.color);
        setIsDiscovered(res.data.isDiscovered);
        setIsCaptured(res.data.isCaptured);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const newPal = {
      name,
      numericId,
      partnerSkill,
      type,
      color,
      isDiscovered,
      isCaptured,
    };

    axios
      .put(`http://localhost:8000/api/pals/${id}`, newPal)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        console.log("ERROR RESPONSE: ", err.response);
        console.log("ERROR RESP DATA: ", err.response.data);
        console.log("ERROR RESP DATA ERRORS: ", err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Nav title={`Edit ${name}`} />
        <form onSubmit={submitHandler}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* Name */}
            <div>
              <TextField
                required
                id="outlined-required"
                value={name}
                label="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                style={{ color: "white", borderColor: "white" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              {errors.name ? (
                <p className="text-danger">{errors.name.message}</p>
              ) : null}
            </div>

            {/* Id */}
            <div>
              <TextField
                required
                id="outlined-required"
                value={numericId}
                label="ID"
                type="number"
                className="input"
                onChange={(e) => setNumericId(e.target.value)}
                style={{ color: "white", borderColor: "white" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              {errors.numericId ? (
                <p className="text-danger">{errors.numericId.message}</p>
              ) : null}
            </div>

            {/* PartnerSkill */}
            <div>
              <TextField
                required
                label="Partner Skill"
                type="text"
                variant="outlined"
                value={partnerSkill}
                onChange={(e) => setPartnerSkill(e.target.value)}
                style={{ color: "white", borderColor: "white" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              {errors.partnerSkill ? (
                <p className="text-danger">{errors.partnerSkill.message}</p>
              ) : null}
            </div>

            {/* Type */}
            <div>
              <TextField
                required
                label="Type"
                type="text"
                variant="outlined"
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ color: "white", borderColor: "white" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              {errors.type ? (
                <p className="text-danger">{errors.type.message}</p>
              ) : null}
            </div>

            {/* Color */}
            <div>
              <TextField
                required
                label="Color"
                type="text"
                variant="outlined"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ color: "white", borderColor: "white" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              {errors.color ? (
                <p className="text-danger">{errors.color.message}</p>
              ) : null}
            </div>

            {/* is Discovered */}
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDiscovered}
                    onChange={() => setIsDiscovered(!isDiscovered)}
                    color="primary"
                    InputLabelProps={{ style: { color: "white" } }}
                  />
                }
                label="Discovered"
              />
              {errors.isDiscovered ? (
                <p className="text-danger">{errors.isDiscovered.message}</p>
              ) : null}
            </div>

            {/* is Captured */}
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCaptured}
                    onChange={() => setIsCaptured(!isCaptured)}
                    color="primary"
                    InputLabelProps={{ style: { color: "white" } }}
                  />
                }
                label="Captured"
              />
              {errors.isCaptured ? (
                <p className="text-danger">{errors.isCaptured.message}</p>
              ) : null}
            </div>
          </Box>

          <Button type="submit">Edit</Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default Edit;

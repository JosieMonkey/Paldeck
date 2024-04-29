import React, { useState, useEffect } from "react";
import Nav from "../components/nav.jsx";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PalDetails = (props) => {
  const [pal, setPal] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pals/${id}`)
      .then((res) => {
        console.log(res);
        setPal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteHandler = () => {
    axios
      .delete(`http://localhost:8000/api/pals/${id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Nav title={pal.name} />
      <div>
        <h2>Name: {pal.name}</h2>
        <h2>ID: {pal.numericId}</h2>
        <h2>Partner Skill: {pal.partnerSkill}</h2>
        <h2>Type: {pal.type}</h2>
        <h2>Color: {pal.color}</h2>
        <h2>Is Discovered: {pal.isDiscovered ? "Yes" : "No"}</h2>
        <h2>Is Captured: {pal.isCaptured ? "Yes" : "No"}</h2>
        <button onClick={deleteHandler}>Delete {pal.name}</button>
      </div>
    </div>
  );
};

export default PalDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/nav.jsx";
import { useNavigate, useParams } from "react-router-dom";

const Update = (props) => {
  const [name, setName] = useState("");
  const [_id, set_id] = useState("");
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
        set_id(res.data._id);
        setPartnerSkill(res.data.partnerSkill);
        setType(res.data.type);
        setColor(res.data.color);
        setIsDiscovered(res.data.isDiscovered);
        setIsCaptured(res.data.IsCaptured);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const newPal = {
      name,
      _id,
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
    <>
      <div></div>
    </>
  );
};

export default Update;

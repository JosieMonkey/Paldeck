import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/nav.jsx";
import { useNavigate, useParams } from "react-router-dom";

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
    <div>
      <Nav title={`Edit ${name}`} />
      <form onSubmit={submitHandler}>
        {/* Name */}
        <div>
          <label className="label">Name:</label>
          <input
            className="input"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {errors.name ? (
            <p className="text-danger">{errors.name.message}</p>
          ) : null}
        </div>

        {/* Id */}
        <div>
          <label className="label">ID:</label>
          <input
            className="input"
            type="number"
            onChange={(e) => setNumericId(e.target.value)}
            value={numericId}
          />
          {errors.numericId ? (
            <p className="text-danger">{errors.numericId.message}</p>
          ) : null}
        </div>

        {/* PartnerSkill */}
        <div>
          <label className="label">Partner Skill:</label>
          <input
            className="input"
            type="text"
            onChange={(e) => setPartnerSkill(e.target.value)}
            value={partnerSkill}
          />
          {errors.partnerSkill ? (
            <p className="text-danger">{errors.partnerSkill.message}</p>
          ) : null}
        </div>

        {/* Type */}
        <div>
          <label className="label">Type:</label>
          <input
            className="input"
            type="text"
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
          {errors.type ? (
            <p className="text-danger">{errors.type.message}</p>
          ) : null}
        </div>

        {/* Color */}
        <div>
          <label className="label">Color:</label>
          <input
            className="input"
            type="text"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          />
          {errors.color ? (
            <p className="text-danger">{errors.color.message}</p>
          ) : null}
        </div>

        {/* is Discovered */}
        <div>
          <label className="form-label">Discovered:</label>
          <input
            className=""
            type="checkbox"
            onChange={() => setIsDiscovered(!isDiscovered)}
            checked={isDiscovered}
          />
          {errors.isDiscovered ? (
            <p className="text-danger">{errors.isDiscovered.message}</p>
          ) : null}
        </div>

        {/* is Captured */}
        <div>
          <label className="form-label">Captured:</label>
          <input
            className=""
            type="checkbox"
            onChange={() => setIsCaptured(!isCaptured)}
            checked={isCaptured}
          />
          {errors.isCaptured ? (
            <p className="text-danger">{errors.isCaptured.message}</p>
          ) : null}
        </div>

        <button>Edit</button>
      </form>
    </div>
  );
};

export default Edit;

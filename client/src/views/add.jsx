import React, { useState } from "react";
import Nav from "../components/nav.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPal = (props) => {
  const [name, setName] = useState("");
  const [numericId, setNumericId] = useState("");
  const [partnerSkill, setPartnerSkill] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [isDiscovered, setIsDiscovered] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      .post(`http://localhost:8000/api/pals`, newPal)
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
      <Nav />
      <div>
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

          <button>Add Pal</button>
        </form>
      </div>
    </div>
  );
};

export default AddPal;

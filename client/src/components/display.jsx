import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    if (!searchTerm) return true; // If no search term is entered, don't filter the pals

    if (searchFilter === "ID") {
      // If filtering by ID (numericId), convert both the pal's numericId and the searchTerm to strings for comparison
      return pal.numericId.toString().includes(searchTerm);
    } else if (searchFilter === "Type" || searchFilter === "Color") {
      // If filtering by Type or Color, which are arrays, convert array elements to string and check if it includes the searchTerm
      return pal[searchFilter.toLowerCase()]
        .join(", ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    } else {
      // For other string filters, perform a case-insensitive comparison
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
    <>
      <div>
        <div>
          <input
            type="text"
            onChange={handleSearchChange}
            placeholder={`Search by ${searchFilter}`}
            title="Type in a name"
          />
          <select onChange={handleFilterChange} value={searchFilter}>
            <option value="Name">Name</option>
            <option value="ID">ID</option>
            <option value="Type">Type</option>
            <option value="Color">Color</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Partner Skill</th>
              <th>Type</th>
              <th>Color</th>
              <th>Discovered</th>
              <th>Captured</th>
            </tr>
          </thead>
          <tbody>
            {filteredPals.map((pal) => (
              <tr key={pal._id}>
                <td>
                  <Link to={`/pals/${pal._id}/palpage`}>{pal.name}</Link>
                </td>
                <td>{pal.numericId}</td>
                <td>{pal.partnerSkill}</td>
                <td>{pal.type}</td>
                <td>{pal.color}</td>
                <td>{pal.isDiscovered ? "Yes" : "No"}</td>
                <td>{pal.isCaptured ? "Yes" : "No"}</td>
                <td>
                  <Link to={`/pals/${pal._id}/edit`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayAll;

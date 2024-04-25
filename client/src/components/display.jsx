import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayAll = (props) => {
  const [pals, setPals] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pals")
      .then((res) => {
        console.log(res.data);
        setPals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function myFunction() {
    var input, filter, tr, th, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    tr = document.getElementById("myTR");
    th = td.getElementsByTagName("th");
    for (i = 0; i < th.length; i++) {
      a = th[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        th[i].style.display = "";
      } else {
        th[i].style.display = "none";
      }
    }
  }

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            id="myInput"
            onkeyup="myFunction()"
            placeholder="Search for names.."
            title="Type in a name"
          />
        </div>
        <table>
          <thead>
            <tr id="myTR">
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
            {pals.map((pal) => (
              <tr key={pal._id}>
                <td>
                  <Link to={`/pals/${pal._id}/details`}>{pal.name}</Link>
                </td>
                <td>{pal.id}</td>
                <td>{pal.partnerSkill}</td>
                <td>{pal.type}</td>
                <td>{pal.color}</td>
                <td>{pal.isDiscovered ? "Yes" : "No"}</td>
                <td>{pal.isCaptured ? "Yes" : "No"}</td>
                <td>
                  <Link to={`/pals/${pal._id}/update`}>Edit</Link>
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

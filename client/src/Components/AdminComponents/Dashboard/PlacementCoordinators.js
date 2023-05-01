import React from "react";
// import {Link} from 'react-router-dom';
// css
// import './LatestPlacedStudent.css';

// img
import personImg from "../img/s4.jpg";

export default function LatestPlacedStudent() {
  return (
    <>
      <table className="table  table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">USN</th>
            <th scope="col">Branch </th>
            <th scope="col">Mo. No. </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-middle">
              <img
                src={personImg}
                alt="..."
                className="TeamPersonImg  "
                circle="Profile Image"
              />
              Suraj
            </td>
            <td className="align-middle ">1MV21MC055</td>
            <td className="align-middle ">MCA</td>
            <td className="align-middle ">9876543210</td>
          </tr>
          <tr>
            <td className="align-middle">
              <img
                src={personImg}
                alt="..."
                className="TeamPersonImg  "
                circle="Profile Image"
              />
              Suraj
            </td>
            <td className="align-middle ">1MV21MC055</td>
            <td className="align-middle ">MCA</td>
            <td className="align-middle ">9876543210</td>
          </tr>
          <tr>
            <td className="align-middle">
              <img
                src={personImg}
                alt="..."
                className="TeamPersonImg  "
                circle="Profile Image"
              />
              Suraj
            </td>
            <td className="align-middle ">1MV21MC055</td>
            <td className="align-middle ">MCA</td>
            <td className="align-middle ">9876543210</td>
          </tr>
          <tr>
            <td className="align-middle">
              <img
                src={personImg}
                alt="..."
                className="TeamPersonImg  "
                circle="Profile Image"
              />
              Suraj
            </td>
            <td className="align-middle ">1MV21MC055</td>
            <td className="align-middle ">MCA</td>
            <td className="align-middle ">9876543210</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

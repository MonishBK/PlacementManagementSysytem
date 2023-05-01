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
            <th scope="col">Branch </th>
            <th scope="col"> Company </th>
            <th scope="col ">LPA </th>
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
              Monish
            </td>
            <td className="align-middle ">MCA</td>
            <td className="align-middle ">Amazon</td>
            <td className="align-middle ">44</td>
          </tr>
          <tr>
            <td className="align-middle">
              <img
                src={personImg}
                alt="..."
                className="TeamPersonImg  "
                circle="Profile Image"
              />
              Monish
            </td>
            <td className="align-middle ">MCA</td>
            <td className="align-middle ">Amazon</td>
            <td className="align-middle ">44</td>
          </tr>
          <tr>
            <td className="align-middle">
              <img
                src={personImg}
                alt="..."
                className="TeamPersonImg  "
                circle="Profile Image"
              />
              Monish
            </td>
            <td className="align-middle ">MCA</td>
            <td className="align-middle ">Amazon</td>
            <td className="align-middle ">44</td>
          </tr>
          <tr>
            <td className="align-middle">
              <img
                src={personImg}
                alt="..."
                className="TeamPersonImg  "
                circle="Profile Image"
              />
              Monish
            </td>
            <td className="align-middle ">MCA</td>
            <td className="align-middle ">Amazon</td>
            <td className="align-middle ">44</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

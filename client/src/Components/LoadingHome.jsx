import React,{useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {Login1} from './Login';

const LoadingHome = () => {

  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/signin");
  // }, []);

  return (
    <>
    {/* <div className="home_con_div">
      <h1>Home Page</h1>
    </div> */}
    <Login1/>
    </>
  )
}

export default LoadingHome
import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Signup from './Signup';
import {Login1} from './Login';
import Contact from './Contact';
import Footer from './Footer';
import Logout from './Logout';
import ResetPassword from './ResetPassword';
import LoadingHome from './LoadingHome';
import ErrorPage from './ErrorPage';


const BasicRouting = () => {
  return (
    <>
    
        <Routes>
            <Route path='/' element={<LoadingHome/>} />
              <Route path='/signin' element={<Login1/>} />
              {/* <Route path='/login' element={<Login/>} /> */}
              <Route path='/signup' element={<Signup/>} />
              <Route path='/logout' element={<Logout/>} />
              <Route path='/contactUs' element={<Contact/>} />
              <Route path='/resetpass' element={<ResetPassword/>} />
              <Route path="*" element={<ErrorPage/>} />
              {/* <Route path='/UserDetails-form' element={<UserDetailsForm/>} /> */}
        </Routes>
        <Footer/>

    </>
  )
}

export default BasicRouting
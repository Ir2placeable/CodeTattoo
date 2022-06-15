import './App.css';
import { Reset } from 'styled-reset';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Header from './pages/Header';
import TattooistEnroll from './pages/TattooistEnroll';
import Footer from './pages/Footer';
import Category from './pages/Category';
import { EntrySection } from './styledComponents';
import Entry from './pages/Entry';
import ImgLoad from './pages/ImgLoad';
import CookieTest from './pages/CookieTest';
import TattooistDrafts from './pages/TattooistDrafts';

import { useCookies } from 'react-cookie';
import axios from 'axios';
import AllDrafts from './pages/AllDrafts';

const apiUrl = "http://3.39.196.91:3001/api";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'user_id', 'name', 'location', 'isTattooist']);

  // const sendRequest = async() => {
  //   const res = await axios.post(`${apiUrl}/draft/browse`, {});
  //   console.log(res)
  //   console.log(res.data.drafts[8])
  // }
  // useEffect(() => {
  //   sendRequest();
  // }, []);
  
  // useEffect(()=>{
  //   removeCookie('user_id');
  //   removeCookie('name');
  //   removeCookie('location');
  //   removeCookie('isTattooist')
  // }, []);

  // useEffect(() => {
  //   getCookieFunc();
  //   setCookie('id', 1234, {maxAge:2000})
  //   setCookie('temp', 'temp', {maxAge:2000})
  //   removeCookie('id');
  //   removeCookie('temp')
  // }, []);

  // const setCookieFunc = () => {
  //   let random = Math.floor(Math.random() * (10 - 0) + 0);
  //   setCookie('rememberNumber', random, {maxAge:2000});
  //   window.location.replace('/');
  //   let result = "setCookie : "+random;
  //   setText(result);
  // }

  // const getCookieFunc = (param) => {
  //   let result = "getCookie : "+cookies.rememberNumber;
  //   setText(result);
  // }

  // const removeCookieFunc = () => {
  //   removeCookie('rememberNumber');
  //   window.location.replace('/');
  //   setText("removeCookie");
  // }


  return (
    <div className='main-font'>
      <Reset />
      <Header cookies={cookies} removeCookie={removeCookie} />

      {/* display: flex; */}
      {/* EntrySection: 카테고리랑 메인컨텐츠 flex 하려고 */}
      <EntrySection>  
        <Category />

        <Routes>
          <Route path='/' element={<Entry
            cookies={cookies} />} />
          {/* Entry */}
          <Route path='/login' element={<Login 
            apiUrl={apiUrl}
            setCookie={setCookie} />} />
          <Route path='/register' element={<SignUp apiUrl={apiUrl} />} />
          <Route path='/tattooist_enrollment' element={<TattooistEnroll 
            apiUrl={apiUrl}
            cookies={cookies}
            setCookie={setCookie} />} />

          {/* User */}


          {/* Tattoist */}
          <Route path='/tattooist/img_load' element={<ImgLoad 
            apiUrl={apiUrl}
            cookies={cookies} />} />
          <Route path="/tattooist/drafts" element={<TattooistDrafts apiUrl={apiUrl} />} />

          {/* Tattoo */}
          <Route path="/tattoo/all" element={<AllDrafts apiUrl={apiUrl} />} />

          {/* Board */}
        </Routes>

      </EntrySection>

      

      <Footer />
    </div>
  );
};

export default App;
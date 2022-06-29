// App.js 스타일
import './App.css';
import { Reset } from 'styled-reset';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/account/Login';
import Register from './components/account/Register';
import MainPage from './components/main/MainPage';

import { APIURL } from './config/key';
import { MainPageDiv } from './styledComponents';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'user_id', 'nickname', 'tattooist_id',
    // for tattooist
    'office', 'contact'
  ])

  const sendRequest = async() => {
    const res = await axios.get(APIURL);

    if(!res.data.success){
      alert('Server is down');
    } else {
      console.log('Servier is connected')
    }
  }

  useEffect(() => {
    sendRequest();
  }, []);
  

  return (
    <div className="font-style">
      <Reset />
      
      {/* HEADER */}
      <Header cookies={cookies} removeCookie={removeCookie} />

      {/* Main Container */}
      <MainPageDiv>

        <Routes>
          {/* Main page */}
          <Route path="/" element={<MainPage cookies={cookies} />} />

          {/* 로그인, 회원가입 */}
          <Route path="/login" element={<Login setCookie={setCookie} />} />
          <Route path="/register" element={<Register setCookie={setCookie}/>} />

        </Routes>

      </MainPageDiv>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default App;
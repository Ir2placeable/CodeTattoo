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
import TattooistDrafts from './pages/TattooistDrafts';

import { useCookies } from 'react-cookie';
import axios from 'axios';
import AllDrafts from './pages/AllDrafts';
import BestDrafts from './pages/BestDrafts';
import RecentDrafts from './pages/RecentDrafts';
import MyPage from './pages/MyPage';

import { APIURL } from './config/key';
import UserMyPage from './pages/UserMyPage';
import ProfileEdit from './pages/ProfileEdit';

const apiUrl = APIURL;

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'user_id', 'name', 'location', 'isTattooist']);

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

          {/* My Page */}
          <Route path="/user/mypage/:user_id" element={<UserMyPage apiUrl={apiUrl} cookies={cookies} />} />
          <Route path="/tattooist/mypage/:tattooist_id" 
            element={<MyPage apiUrl={apiUrl} cookies={cookies} setCookie={setCookie} />}>
          </Route>
                    {/* parameter를 줄까말까... */}
          <Route path="/tattooist/mypage/edit" 
            element={<ProfileEdit apiUrl={apiUrl} cookies={cookies} setCookie={setCookie} />} />

          {/* User */}
        
          <Route path="/imgload" element={<ImgLoad apiUrl={apiUrl} cookies={cookies} />}></Route>
        
          {/* Tattoist */}

          {/* Tattoo */}
          <Route path="/tattoo/best" element={<BestDrafts apiUrl={apiUrl} />} />
          <Route path="/tattoo/recent" element={<RecentDrafts apiUrl={apiUrl} />} />
          <Route path="/tattoo/all" element={<AllDrafts apiUrl={apiUrl} />} />

          {/* Board */}
        </Routes>

      </EntrySection>

      

      <Footer />
    </div>
  );
};

export default App;
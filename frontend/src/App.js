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
import TattooistList from './pages/TattooistList';
import ShowPostList from './pages/ShowPostList';
import UserProfileEdit from './pages/UserProfileEdit';
import HeartIcon from './pages/HeartIcon';
import Calendar from 'react-calendar';
import CalendarComp from './pages/CalendarComp';

const apiUrl = APIURL;
const temp_scraps = [
  { _id: '123a' },
  { _id: '456a' },
  { _id: '789a' }
]

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'user_id', 'name', 'location', 'isTattooist',
    'nickname', 'specialize', 'address', 'contact', 'description', 'image',
    'user_desc', 'user_image', 'scraps', 'following'
  ]);

  // useEffect(() => {
  //   //setCookie('scraps', temp_scraps, {maxAge: 3000});
  //   console.log(cookies.scraps)
  //   for(let i=0; i<cookies.scraps.length; i++){
  //     console.log(cookies.scraps[i]);
  //   }
  // }, []);

  return (
    <div className='main-font'>
      <Reset />
      <Header cookies={cookies} removeCookie={removeCookie} />

      {/* <HeartIcon size={30} user_id="1" draft_id="123ab" cookies={cookies} /> */}

      {/* display: flex; */}
      {/* EntrySection: 카테고리랑 메인컨텐츠 flex 하려고 */}
      <EntrySection>  
        <Category />

        <Routes>
          {/* Entry page */}
          <Route path='/' element={<Entry
            cookies={cookies} />} />
          {/* 로그인, 회원가입, 타투이스트 등록 */}
          <Route path='/login' element={<Login 
            apiUrl={apiUrl}
            setCookie={setCookie} />} />
          <Route path='/register' element={<SignUp apiUrl={apiUrl} />} />
          <Route path='/tattooist_enrollment' element={<TattooistEnroll 
            apiUrl={apiUrl}
            cookies={cookies}
            setCookie={setCookie} />} />

          {/* My Page */}
          <Route path="/user/mypage/:user_id" element={<UserMyPage apiUrl={apiUrl} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}  />} />
          <Route path="/tattooist/mypage/:tattooist_id" 
            element={<MyPage apiUrl={apiUrl} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}  />}>
          </Route>
                    
          <Route path="/tattooist/mypage/edit/:tattooist_id" 
            element={<ProfileEdit apiUrl={apiUrl} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} />} />
          <Route path="/user/mypage/edit/:user_id"
            element={<UserProfileEdit apiUrl={apiUrl} cookies={cookies} />} />

          {/* <Route path="/tattooist/calendar/:tattooist_id" element={<CalendarComp apiUrl={apiUrl}  cookies={cookies} />} /> */}

          {/* 도안 등록 */}
          <Route path="/imgload" element={<ImgLoad apiUrl={apiUrl} cookies={cookies} />}></Route>
        
          {/* Tattoist List */}
          <Route path="/tattooists" element={<TattooistList apiUrl={apiUrl} cookies={cookies}  />} />

          {/* Tattoo List */}
          <Route path="/tattoo/best" element={<BestDrafts apiUrl={apiUrl} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} />} />
          <Route path="/tattoo/recent" element={<RecentDrafts apiUrl={apiUrl} cookies={cookies} />} setCookie={setCookie} removeCookie={removeCookie} />
          <Route path="/tattoo/all" element={<AllDrafts apiUrl={apiUrl} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} />} />

          {/* Board */}
          <Route path="/board" element={<ShowPostList apiUrl={apiUrl} cookies={cookies} />} />
        
          
        </Routes>

      </EntrySection>

      

      <Footer />
    </div>
  );
};

export default App;
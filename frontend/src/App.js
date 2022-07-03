// App.js 스타일
import "./App.css";
import { Reset } from "styled-reset";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import { APIURL } from "./config/key";
import { MainPageDiv } from "./styledComponents";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import MainPage from "./components/main/MainPage";
import ShowDraftList from "./components/main/ShowDraftList";
import ShowTattooistList from "./components/main/ShowTattooistList";
import TattooistList from "./components/main/TattooistList";
import SearchTattooist from "./components/main/SearchTattooist";
import ShowScrap from "./components/main/ShowScrap";
import ShowMyTattoo from "./components/main/ShowMyTattoo";
import ShowManageWork from "./components/main/ShowManageWork";
import ShowManageDraft from "./components/main/ShowManageDraft";
import DraftList from "./components/main/DraftList";
import ScrapTattooist from "./components/main/ScrapTattooist";
import User from "./components/mypage/User";
import Tattooist from "./components/mypage/Tattooist";
import SearchDraft from "./components/main/SearchDraft";
import ImageUpload from './components/main/ImageUpload';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "user_id",
    "nickname",
    "tattooist_id",
    // for tattooist
    "office",
    "contact",
    // my page info
    "profile_img_src",
    "profile_desc"
  ]);

  const sendRequest = async () => {
    const res = await axios.get(APIURL);

    if (!res.data.success) {
      alert("Server is down");
    } else {
      console.log("Servier is connected");
    }
  };

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
          <Route path="/" element={<MainPage cookies={cookies} />}>
            {/* 도안 목록 */}
            <Route path="draft" element={<ShowDraftList />}>
              <Route path="best" element={<DraftList cookies={cookies} filter={'draft'} path={"main/draft/best"} />} />
              <Route path="all"  element={<DraftList cookies={cookies} filter={'draft'} path={"main/draft/all"} />} />
              <Route path="search/:title" element={<SearchDraft cookies={cookies} />}  />
            </Route>

            {/* 타투이스트 목록 */}
            <Route path="tattooist" element={<ShowTattooistList />}>
              <Route
                path="best"
                element={<TattooistList cookies={cookies} filter={"best"} />}
              />
              <Route
                path="all"
                element={<TattooistList cookies={cookies} filter={"all"} />}
              />
              <Route
                path="search/:nickname"
                element={<SearchTattooist cookies={cookies} />}
              />
            </Route>

            {/* 스크랩 목록 */}
            <Route path="scrap" element={<ShowScrap />} >
              <Route path="draft" element={<DraftList cookies={cookies} filter={'scrap'} path={"main/scrap/draft"} />} />
              <Route path="tattooist" element={<ScrapTattooist />} />
            </Route>

            {/* 마이 타투 목록 */}
            <Route
              path="myTattoo"
              element={<ShowMyTattoo cookies={cookies} />}
            />

            {/* 작업물 관리 */}
            <Route path="manageWork" element={<ShowManageWork />} />

            {/* 도안 관리 */}
            <Route path="manageDraft" element={<ShowManageDraft />}>
              <Route path="manage" element={<DraftList path={"main/my-draft/list"} filter={"my-draft"} cookies={cookies} />} />
              <Route path="upload" element={<ImageUpload cookies={cookies} />} />
            </Route>

          </Route>

          {/* 로그인, 회원가입 */}
          <Route path="/login" element={<Login setCookie={setCookie} />} />
          <Route
            path="/register"
            element={<Register setCookie={setCookie} />}
          />

          {/* 마이 페이지 */}
          <Route path="/mypage/:user_id" 
            element={<User cookies={cookies} />} />
          <Route
            path="/mypage/:tattooist_id"
            element={<Tattooist cookies={cookies} />}
          />
        </Routes>
      </MainPageDiv>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default App;

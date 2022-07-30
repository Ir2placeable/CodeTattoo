// App.js 스타일
import "./App.css";
import { Reset } from "styled-reset";

import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import { APIURL } from "./config/key";
import { MainPageDiv } from "./styledComponents";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import MainPage from "./pages/MainPage";
import ShowDraftDetail from "./pages/ShowDraftDetail";
import ShowMyTattoo from "./pages/ShowMyTattoo";
import ShowTattooistList from "./pages/ShowTattooistList";
import TattooistList from "./components/templates/TattooistList";
import ShowMyPage from "./pages/ShowMyPage";
import Navigation from "./components/organisms/common/Navigation";
import ShowEntry from "./pages/ShowEntry";
import ShowDraftList from "./pages/ShowDraftList";
import DraftList from "./components/templates/DraftList";

const App = () => {
  const sendRequest = async () => {
    const res = await axios.get(`${APIURL}/entry`);

    if (res.data.success) {
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
      <Header />
      <Navigation />
      {/* Main Container */}
      <MainPageDiv>
        <Routes>
          {/* Main page */}
          <Route path="/" element={<MainPage />}>
            {/* 도안 상세 */}
            {/* <Route path="draft" element={<ShowDraftDetail />} */}
            <Route path="draft" element={<ShowDraftList />}>
              <Route path="best" element={<DraftList filter="best" />} />
              <Route path="all" element={<DraftList filter="all" />} />
              <Route path="search/:title" />
            </Route>

            {/* 타투이스트 목록 */}
            <Route path="tattooist" element={<ShowTattooistList />}>
              <Route path="best" element={<TattooistList />} />
              <Route path="all" element={<TattooistList />} />
              <Route path="search/:nickname" element={<TattooistList />} />
            </Route>

            {/* 마이 페이지 */}
            <Route path="my-page" element={<ShowMyPage />}>
              <Route path="user" element={<ShowMyTattoo />} />
              <Route path="tattooist" />
            </Route>
          </Route>
          {/* 로그인, 회원가입 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* 엔트리 페이지 */}
          <Route path="/" element={<ShowEntry />} />

          {/* 메인 페이지 */}
          <Route path="/draft" element={<ShowDraftList filter="best" />} />
          {/* <Route path="/main">

            <Route path="draft" element={<ShowDraftList filter="best" />} />


          </Route> */}
        </Routes>
      </MainPageDiv>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default App;

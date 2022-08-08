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
import ShowDraftUpload from "./pages/ShowDraftUpload";
import DraftUpload from "./components/templates/DraftUpload";
import ShowScrap from "./pages/ShowScrap";
import ShowTattooistDetail from "./pages/ShowTattooistDetail";
import TattooistDetailDraft from "./components/templates/TattooistDetailDraft";
import TattooistDetailArtwork from "./components/templates/TattooistDetailArtwork";
import TattooistDetailReservation from "./components/templates/TattooistDetailReservation";
import DraftSearch from "./components/templates/DraftSearch";


const App = () => {
  const sendRequest = async () => {
    const res = await axios.get(`${APIURL}/entry`);

    if (res.data.success) {
      console.log("Server is connected");
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div className="font-style" style={{
      minHeight: '100vh', position: 'relative',
      paddingBottom: '130px'}}>
      <Reset />

      {/* HEADER */}
      <Header />
      {/* <Navigation /> */}
      {/* Main Container */}
      <MainPageDiv>
        <Routes>

          {/* Main page */}
          <Route path="/" element={<MainPage />}>
          
            {/* 도안 */}
            <Route path="drafts" element={<ShowDraftList />}>
              <Route path="best" element={<DraftList filter="drafts/best" />} />
              <Route path="all" element={<DraftList filter="drafts/all" />} />
              <Route path="search/:title" element={<DraftSearch />} />
            </Route>

            {/* 도안 등록 - 타투이스트만 해당 */}
            <Route path="upload" element={<ShowDraftUpload />}/>

            {/* 도안 상세 */}
            <Route path="draft/:draft_id" element={<ShowDraftDetail />} />

            {/* 타투이스트 목록 */}
            <Route path="tattooists" element={<ShowTattooistList />}>
              <Route path="best" element={<TattooistList />} />
              <Route path="all" element={<TattooistList />} />
              <Route path="search/:nickname" element={<TattooistList />} />
            </Route>
            {/* 타투이스트 상세 */}
            <Route path="tattooist/:tattooist_id" element={<ShowTattooistDetail />}>
              <Route path="draft" element={<TattooistDetailDraft />} />
              <Route path="artwork" element={<TattooistDetailArtwork />} />
              <Route path="reservation" element={<TattooistDetailReservation />}
              />
            </Route>

            {/* 마이 페이지 */}
            <Route path="my-page" element={<ShowMyPage />}>
              <Route path="user/:user_id" element={<ShowMyTattoo />} />
            </Route>

            {/* 예약 */}
            <Route path="reservation" element={<div>예약</div>} />

            {/* 스크랩 */}
            <Route path="scraps" element={<ShowScrap />} >
              <Route path="draft" element={<DraftList filter="scraps/draft" />} />
              <Route path="tattooist" element={<div>냥</div>} />
            </Route>

          </Route>


          {/* 로그인, 회원가입 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 엔트리 페이지 */}
          <Route path="/" element={<ShowEntry />} />
        </Routes>
      </MainPageDiv>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default App;

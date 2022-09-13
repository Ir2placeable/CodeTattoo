// App.js 스타일
import "./App.css";
import { Reset } from "styled-reset";

import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import { APIURL } from "./config/key";
import { MainPageDiv, ToastAlarmBox } from "./styledComponents";

// Components
import Header from "./components/organisms/header/Header";
import Footer from "./components/organisms/footer/Footer";
import Login from "./components/organisms/account/Login";
import Register from "./components/organisms/account/Register";
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
import ShowProfileEdit from "./pages/ShowProfileEdit";
import ProfileEdit from "./components/templates/ProfileEdit";
import ShowReservation from "./pages/ShowReservation";
import TattooistSearch from "./components/templates/TattooistSearch";
import ImageEdit from "./components/templates/ImageEdit";
import DraftDetail from "./components/templates/DraftDetail";
import DraftEdit from "./components/templates/DraftEdit";
import ReservationList from "./components/templates/ReservationList";
import Procedure from "./components/organisms/reservation/Procedure";
import Chatting from "./components/templates/Chatting";
import PasswordEdit from "./components/templates/PasswordEdit";
import DeleteAccount from "./components/templates/DeleteAccount";
import 'react-toastify/dist/ReactToastify.css';
import ShowArtworkDetail from "./pages/ShowArtworkDetail";
import SocketTest from "./SocketTest";
import ChattingRecord from "./components/organisms/chatting/ChattingRecord";
import ChattingRoomEntry from "./components/organisms/chatting/ChattingRoomEntry";

const App = () => {

  return (
    <div className="font-style">
      <Reset />

      {/* HEADER */}
      <Header />
      {/* <Navigation /> */}
      {/* Main Container */}    

      <MainPageDiv id="scroll">
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

            {/* 타투이스트 목록 */}
            <Route path="tattooists" element={<ShowTattooistList />}>
              <Route path="best" element={<TattooistList filter="tattooists/best" />} />
              <Route path="all" element={<TattooistList filter="tattooists/all"/>} />
              <Route path="search/:nickname" element={<TattooistSearch />} />
            </Route>

            {/* 타투이스트 상세 */}
            <Route path="tattooist/:tattooist_id" element={<ShowTattooistDetail />}>
              <Route path="draft" element={<TattooistDetailDraft />} />
              <Route path="artwork" element={<TattooistDetailArtwork />} />
              <Route path="reservation" element={<TattooistDetailReservation />}
              />
            </Route>

            {/* 도안 상세 & 수정 페이지 */}
            <Route path="draft/:draft_id" element={<ShowDraftDetail />}>
              <Route path="detail" element={<DraftDetail />} />
              <Route path="edit" element={<DraftEdit />} />
            </Route>
            {/* <Route path="draft/:draft_id/edit" element={<ShowDraftUpload />} /> */}

            {/* 작업물 상세 */}
            <Route path="artwork/:tattoo_id/:tattooist_id" element={<ShowArtworkDetail/>} />

            {/* 마이 페이지 */}
            <Route path="my-page/user/:user_id" element={<ShowMyPage />}/>

            {/* 프로필 편집 */}
            <Route path="edit" element={<ShowProfileEdit/>}>
              <Route path="image" element={<ImageEdit/>}/>
              <Route path="profile" element={<ProfileEdit/>}/>
              <Route path="password" element={<PasswordEdit/>}/>
              <Route path="delete" element={<DeleteAccount/>}/>
            </Route>

            {/* 예약 */}
            <Route path="reservations" element={<ShowReservation />}>
              <Route path="confirmed" element={<ReservationList />} />
              <Route path="pending" element={<ReservationList />} />
            </Route>

            {/* 예약/작업 상세 페이지 */}
            <Route path="reservation/:reservation_id" element={<Procedure />} />

            {/* 스크랩 */}
            <Route path="scraps" element={<ShowScrap />} >
              <Route path="draft" element={<DraftList filter="scraps/draft" />} />
              <Route path="tattooist" element={<TattooistList filter="scraps/tattooist"/>}/>
            </Route>

            {/* 채팅 */}
            {/* id: user_id || tattooist_id */}
            <Route path="chat/:id" element={<Chatting />}>
              <Route path="" element={<ChattingRoomEntry />} />
              <Route path=":reservation_id" element={<ChattingRecord />} />
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

      {/* <SocketTest /> */}
    </div>
  );
};

export default App;

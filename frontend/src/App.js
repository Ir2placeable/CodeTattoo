// App.js 스타일
import "./App.css";
import { Reset } from "styled-reset";

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { MainPageDiv, ToastAlarmBox } from "./styledComponents";
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from "./components/organisms/header/Header";
import Footer from "./components/organisms/footer/Footer";
import Login from "./components/templates/Login";
import Register from "./components/templates/Register";
import MainPage from "./pages/MainPage";
import ShowDraftDetail from "./pages/ShowDraftDetail";
import ShowTattooistList from "./pages/ShowTattooistList";
import TattooistList from "./components/templates/TattooistList";
import ShowMyPage from "./pages/ShowMyPage";
import ShowEntry from "./pages/ShowEntry";
import ShowDraftList from "./pages/ShowDraftList";
import DraftList from "./components/templates/DraftList";
import ShowDraftUpload from "./pages/ShowDraftUpload";
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
import ShowArtworkDetail from "./pages/ShowArtworkDetail";
import ChattingRoomEntry from "./components/organisms/chatting/ChattingRoomEntry";
import ChattingRoom from "./components/organisms/chatting/ChattingRoom";
import ChattingReservation from "./components/organisms/chatting/ChattingReservation";
import ShowAuctionList from "./pages/ShowAuctionList";
import AuctionList from "./components/templates/AuctionList";
import AuctionSearch from "./components/templates/AuctionSearch";
import DraftUpload from "./components/templates/DraftUpload";
import AuctionUpload from "./components/templates/AuctionUpload";
import ShowAuctionDetail from "./pages/ShowAuctionDetail";
import BidderUpload from "./components/templates/BidderUpload";
import ChattingMyTattoo from "./components/organisms/chatting/ChattingMyTattoo";
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <div className="font-style">
      <Reset />

      {/* HEADER */}
      <Header />
      
      {/* Main Container */}    
      <MainPageDiv id="scroll">
      <ToastAlarmBox>
        <ToastContainer position="top-right" autoClose="1500" closeOnClick />
      </ToastAlarmBox>
        <Routes>
          {/* Main page */}
          <Route path="/" element={<MainPage />}>

            {/* 도안 목록 */}
            <Route path="drafts" element={<ShowDraftList />}>
              <Route path="best" element={<DraftList filter="drafts/best/else" />} />
              <Route path="all" element={<DraftList filter="drafts/all/else" />} />
              <Route path="best/scalp" element={<DraftList filter="drafts/best/scalp" />} />
              <Route path="all/scalp" element={<DraftList filter="drafts/all/scalp" />} />
              <Route path="best/eyebrow" element={<DraftList filter="drafts/best/eyebrow" />} />
              <Route path="all/eyebrow" element={<DraftList filter="drafts/all/eyebrow" />} />
              <Route path="search/:title" element={<DraftSearch />} />
            </Route>

            {/* 등록 페이지 */}
            <Route path="upload" element={<ShowDraftUpload />}>
              {/* 도안 등록 - 타투이스트만 해당 */}
              <Route path="draft" element={<DraftUpload/>} />
              {/* 경매 등록 - 유저만 해당 */}
              <Route path="auction" element={<AuctionUpload/>}/>
              {/* 응찰 등록 - 타투이스트만 해당 */}
              <Route path="auction/:id" element={<BidderUpload/>}/>
            </Route>
            
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
              <Route path=":reservation_id/room" element={<ChattingRoom />} />
              <Route path=":reservation_id/reservation" element={<ChattingReservation />} />
              <Route path=":reservation_id/my-tattoo" element={<ChattingMyTattoo />} />
            </Route>

            {/* 경매 목록 */}
            <Route path="auctions" element={<ShowAuctionList />}>
              <Route path="all" element={<AuctionList filter="auctions/all" />} />
              <Route path="coverup" element={<AuctionList filter="auctions/coverup" />} />
              <Route path="request" element={<AuctionList filter="auctions/request" />} />
              <Route path="search/:title" element={<AuctionSearch />} />
            </Route>

            {/* 경매 상세 */}
            <Route path="auction/:id" element={<ShowAuctionDetail/> } />
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

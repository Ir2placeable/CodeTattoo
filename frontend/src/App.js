// App.js 스타일
import "./App.css";
import { Reset } from "styled-reset";

import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import { APIURL } from "./config/key";
import { MainPageDiv, ToastAlarmBox } from "./styledComponents";

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
import ShowProfileEdit from "./pages/ShowProfileEdit";
import ProfileEdit from "./components/templates/ProfileEdit";
import ShowReservation from "./pages/ShowReservation";
import TattooistSearch from "./components/templates/TattooistSearch";
import ImageEdit from "./components/templates/ImageEdit";
import DraftDetail from "./components/templates/DraftDetail";
import DraftEdit from "./components/templates/DraftEdit";
import { getCookie } from "./config/cookie";
import ReservationList from "./components/templates/ReservationList";
import Procedure from "./components/organisms/reservation/Procedure";
import ChattingList from "./components/organisms/chatting/ChattingList";
import PasswordEdit from "./components/templates/PasswordEdit";
import DeleteAccount from "./components/templates/DeleteAccount";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

// - GET : /scraps/:filter/:page
//     - filter : draft, tattooist
//     - page : integer type
// - Query : { user_id }
const App = () => {
  const sendRequest = async () => {
    const res = await axios.get(`${APIURL}/scraps/tattooist/1?user_id=${getCookie('user_id')}`, );

    console.log('tattooist scrap: ',res);
  };

  return (
    <div className="font-style">
      <Reset />

      {/* HEADER */}
      <Header />
      {/* <Navigation /> */}
      {/* Main Container */}

        {/*<ToastAlarmBox>
          <ToastContainer
            position="top-right"
            autoClose="1500"
            closeOnClick/>
        </ToastAlarmBox>*/}      

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

            {/* 도안 상세 */}
            {/* <Route path="draft/:draft_id" element={<ShowDraftDetail />} /> */}

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

            {/* 마이 페이지 */}
            <Route path="my-page" element={<ShowMyPage />}>
              <Route path="user/:user_id" element={<ShowMyTattoo />} />
            </Route>

            {/* 프로필 편집 */}
            <Route path="edit" element={<ShowProfileEdit/>}>
              <Route path="image" element={<ImageEdit/>}/>
              <Route path="profile" element={<ProfileEdit/>}/>
              <Route path="password" element={<PasswordEdit/>}/>
              <Route path="delete" element={<DeleteAccount/>}/>
            </Route>

            {/* 예약 */}
            <Route path="reservations" element={<ShowReservation />}>
              <Route path="" element={<ReservationList />} />
              <Route path=":reservation_id" element={<Procedure />} />
            </Route>

            {/* 스크랩 */}
            <Route path="scraps" element={<ShowScrap />} >
              <Route path="draft" element={<DraftList filter="scraps/draft" />} />
              <Route path="tattooist" element={<TattooistList filter="scraps/tattooist"/>}/>
            </Route>

            {/* 채팅 */}
            <Route path="chat/:id" element={<ChattingList />} />

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

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

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "user_id",
    "nickname",
    "tattooist_id",
    // for tattooist
    "office",
    "contact",
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
            <Route path="draft" element={<ShowDraftList />} />
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
            <Route path="scrap" element={<ShowScrap />} />
            <Route
              path="myTattoo"
              element={<ShowMyTattoo cookies={cookies} />}
            />
            <Route path="manageWork" element={<ShowManageWork />} />
            <Route path="manageDraft" element={<ShowManageDraft />} />
          </Route>

          {/* 로그인, 회원가입 */}
          <Route path="/login" element={<Login setCookie={setCookie} />} />
          <Route
            path="/register"
            element={<Register setCookie={setCookie} />}
          />
        </Routes>
      </MainPageDiv>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default App;

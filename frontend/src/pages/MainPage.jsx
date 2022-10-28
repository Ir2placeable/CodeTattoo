import React from "react";
import { MainContentsDiv } from "../styledComponents";

import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/organisms/common/Navigation";
import ShowEntry from "./ShowEntry";
import { useEffect } from "react";
import qs from 'qs'
import { setCookie } from "../config/cookie";
import { goDraftList } from "../config/navigate";
import axios from "axios";
import { PUSHURL } from "../config/key";

/* 메인 페이지 */
const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    const query = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    })
    const code = query.code

    if(location.pathname === '/' && code){
      axios.get(`${PUSHURL}/login/kakao?code=${code}`)
        .then((res) => {
          setCookie('auth_token', res.data.token)
          goDraftList()
        })
    }
  }, [])

  return (
    <>

      {location.pathname === '/' ? (
        <ShowEntry />
      ) : (
      <>
        <Navigation />

        <MainContentsDiv>
          <Outlet />
        </MainContentsDiv>
      </>
      )}
      
    </>
  );
};

export default MainPage;

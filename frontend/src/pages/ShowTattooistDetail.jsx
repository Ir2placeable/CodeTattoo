import React from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { 
  ContentsDiv, ListDiv, MyPageDiv, 
  MyPageAddBtnDiv, MyPageAddBtn
} from "../styledComponents";
import MyPageNav from "../components/organisms/common/MyPageNav";
import useTattooistDetail from "../hooks/useTattooistDetail";
import { useState } from "react";
import { useEffect } from "react";
import { getCookie } from "../config/cookie";

const ShowTattooistDetail = () => {
  const location = useLocation();
  const path = location.pathname; // tattooist/tattooist_id/filter
  const [profile, items] = useTattooistDetail(path);
  // console.log(profile, items);

  return (
    <>
      <MyPageDiv>
        <ListDiv>
          <MyPageProfile profile={profile} />
          <MyPageNav />
          <Outlet context={items} />
        </ListDiv>
      </MyPageDiv>
    </>
  );
};

export default ShowTattooistDetail;

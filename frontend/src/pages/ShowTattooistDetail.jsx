import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { getCookie } from "../config/cookie";
import { ContentsDiv, ListDiv } from "../styledComponents";
import MyPageNav from "../components/organisms/common/MyPageNav";
import useTattooistDetail from "../hooks/useTattooistDetail";

const ShowTattooistDetail = () => {
  // const profile = {
  //   image: "../../img/react.jpg",
  //   user_id: 1,
  //   nickname: "Sponge Bob",
  //   location: "Bikini Bottom",
  //   specialize: "Making Hamberger",
  //   description: "햄버거 만드는게 제일 좋았어요",
  // };

  const location = useLocation();
  const path = location.pathname; // tattooist/tattooist_id/filter
  const [profile, data] = useTattooistDetail(path);
  console.log(profile, data);
  return (
    <>
      <ContentsDiv>
        <ListDiv>
          <MyPageProfile profile={profile} />
          <MyPageNav />
          <Outlet context={{ data }} />
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowTattooistDetail;

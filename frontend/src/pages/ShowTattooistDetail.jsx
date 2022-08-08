import React from "react";
import { Outlet } from "react-router-dom";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { getCookie } from "../config/cookie";
import { ContentsDiv, ListDiv } from "../styledComponents";
import MyPageNav from "../components/organisms/common/MyPageNav";

const ShowTattooistDetail = () => {
  const profile = {
    image: "../../img/react.jpg",
    user_id: 1,
    nickname: "Sponge Bob",
    location: "Bikini Bottom",
  };

  return (
    <>
      <ContentsDiv>
        <ListDiv>
          <MyPageProfile profile={profile} />
          <MyPageNav />
          <Outlet />
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowTattooistDetail;

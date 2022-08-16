import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { ContentsDiv, ListDiv } from "../styledComponents";
import MyPageNav from "../components/organisms/common/MyPageNav";
import useTattooistDetail from "../hooks/useTattooistDetail";

const ShowTattooistDetail = () => {
  const location = useLocation();
  const path = location.pathname; // tattooist/tattooist_id/filter
  const [profile, items] = useTattooistDetail(path);
  console.log(profile, items);
  return (
    <>
      <ContentsDiv>
        <ListDiv>
          <MyPageProfile profile={profile} />
          <MyPageNav />
          <Outlet context={items} />
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowTattooistDetail;

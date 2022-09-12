import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { 
  ListDiv, MyPageDiv, 
} from "../styledComponents";
import MyPageNav from "../components/organisms/common/MyPageNav";
import useTattooistDetail from "../hooks/useTattooistDetail";

/**
 * @file Tattooist Profile Detail Page 
 * @Outlet Draft, Artwork, Reservation
 */

const ShowTattooistDetail = () => {

  // GET Tattooist Detail Data
  const location = useLocation();
  const path = location.pathname; 
  const [profile, items] = useTattooistDetail(path);

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

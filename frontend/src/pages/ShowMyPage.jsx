import React from "react";
import { Outlet } from "react-router-dom";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { getCookie } from "../config/cookie";
import {
  HorizontalLine,
  ListDiv,
  MyPageDiv,
} from "../styledComponents";
import useUserMyPage from "../hooks/useUserMyPage";
import ShowMyTattoo from "./ShowMyTattoo";

const ShowMyPage = () => {
  /* User My Page Data */
  const [data, profile] = useUserMyPage();

  return (
    <>
      <MyPageDiv>
        <ListDiv>
          <MyPageProfile profile={profile} />
          <HorizontalLine></HorizontalLine>
          <ShowMyTattoo tattoos={data} />
        </ListDiv>
      </MyPageDiv>
    </>
  );
};

export default ShowMyPage;

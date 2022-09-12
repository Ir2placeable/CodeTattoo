import React, { useState, useEffect } from "react";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { getCookie } from "../config/cookie";
import { HorizontalLine, ListDiv, MyPageDiv } from "../styledComponents";
import useUserMyPage from "../hooks/useUserMyPage";
import ShowMyTattoo from "./ShowMyTattoo";

const ShowMyPage = () => {
  /* User My Page Data */
  const sendRequest = useUserMyPage();
  const [profile, setProfile] = useState({});
  const [tattoos, setTattoos] = useState([]);
  
  useEffect(() => {
    sendRequest().then((ret) => {
      setProfile(ret[0]);
      setTattoos(ret[1]);
    });
  }, []);

  return (
    <>
      <MyPageDiv>
        <ListDiv>
          <MyPageProfile profile={profile} />
          <HorizontalLine></HorizontalLine>
          <ShowMyTattoo tattoos={tattoos} />
        </ListDiv>
      </MyPageDiv>
    </>
  );
};

export default ShowMyPage;

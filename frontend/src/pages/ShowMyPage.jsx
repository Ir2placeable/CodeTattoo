import React, { useState, useEffect } from "react";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { HorizontalLine, ListDiv, MyPageDiv } from "../styledComponents";
import useUserMyPage from "../hooks/useUserMyPage";
import ShowMyTattoo from "./ShowMyTattoo";

/* 유저 마이 페이지 */
const ShowMyPage = () => {
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
          {/* 유저 프로필 정보 */}
          <MyPageProfile profile={profile} />
          <HorizontalLine></HorizontalLine>
          {/* 유저 마이 타투  */}
          <ShowMyTattoo tattoos={tattoos} />
        </ListDiv>
      </MyPageDiv>
    </>
  );
};

export default ShowMyPage;

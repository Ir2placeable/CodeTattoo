import React from "react";
import { Outlet } from "react-router-dom";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { getCookie } from "../config/cookie";
import { ContentsDiv, HorizontalLine, ListDiv } from "../styledComponents";

const ShowMyPage = () => {
  /* User My Page Data */
  //const data = useUserMyPage();
  const tattoos = [
    {
      tattoo_id: 1,
      state: [
        { id: 1, title: "STATE1", content: "Recover" },
        { id: 2, title: "STATE2", content: "Retouch" },
        { id: 3, title: "STATE3", content: "Tattoo" },
        { id: 4, title: "STATE4", content: "Final" },
      ],
      tattooist_id: 101,
    },
    {
      tattoo_id: 2,
      state: [
        { id: 1, title: "STATE1", content: "Recover" },
        { id: 2, title: "STATE2", content: "Retouch" },
        { id: 3, title: "STATE3", content: "Tattoo" },
        { id: 4, title: "STATE4", content: "Final" },
      ],
      tattooist_id: 102,
    },
    {
      tattoo_id: 3,
      state: [
        { id: 1, title: "STATE1", content: "Recover" },
        { id: 2, title: "STATE2", content: "Retouch" },
        { id: 3, title: "STATE3", content: "Tattoo" },
        { id: 4, title: "STATE4", content: "Final" },
      ],
      tattooist_id: 103,
    },
  ];

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
          <HorizontalLine></HorizontalLine>
          {/*getCookie("user_id") ? (<Outlet context={{ tattoos }} />) : (<Outlet />)*/}
          <Outlet context={{ tattoos }} />
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowMyPage;

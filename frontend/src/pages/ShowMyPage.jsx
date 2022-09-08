import React from "react";
import { Outlet } from "react-router-dom";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { getCookie } from "../config/cookie";
import {
  ContentsDiv,
  HorizontalLine,
  ListDiv,
  MyPageDiv,
} from "../styledComponents";
import useUserMyPage from "../hooks/useUserMyPage";
import ShowMyTattoo from "./ShowMyTattoo";

const ShowMyPage = () => {
  /* User My Page Data */
  const [data, profile] = useUserMyPage();
  console.log(profile);
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

  return (
    <>
      <MyPageDiv>
        <ListDiv>
          <MyPageProfile profile={profile} />
          <HorizontalLine></HorizontalLine>
          <ShowMyTattoo tattoos={tattoos}/>
        </ListDiv>
      </MyPageDiv>
    </>
  );
};

export default ShowMyPage;

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

  const tattoos = [
    {
      image:
        "https://codetattoo.kr.object.ncloudstorage.com/6315974c3d47f773cf058163",
      states: [
        {
          activator_id: 1,
          state: "state1",
          timestamp: 1203,
          cost: 100000,
          image: "https://codetattoo.kr.object.ncloudstorage.com/6315974c3d47f773cf058163",
          body_part: "body_part",
          inks: "inks",
          niddle: "niddle",
          depth: "depth",
          machine: "machine",
        },
        {
          activator_id: 2,
          state: "state2",
          timestamp: 1203,
          cost: 100000,
          image: "https://codetattoo.kr.object.ncloudstorage.com/631589dda5ef1d69772dbbc0",
          body_part: "body_part",
          inks: "inks",
          niddle: "niddle",
          depth: "depth",
          machine: "machine",
        },
        {
          activator_id: 3,
          state: "state3",
          timestamp: 1203,
          cost: 100000,
          image: "https://codetattoo.kr.object.ncloudstorage.com/63175ba731029111648c2261",
          body_part: "body_part",
          inks: "inks",
          niddle: "niddle",
          depth: "depth",
          machine: "machine",
        },
      ],
    },
  ];

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

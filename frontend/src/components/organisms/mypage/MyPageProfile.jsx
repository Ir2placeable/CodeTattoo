import React from "react";
import {
  MyPageProfileBox,
  ProfileImg,
  ProfileImgBox,
  ProfileImgEdit,
  MyPageProfileInfoBox,
  MyPageProfileNickname,
  MyPageProfileInfoList,
  MyPageProfileInfo,
  MyPageProfileDescription,
  ProfileEdit,
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const MyPageProfile = ({ profile }) => {
  // ProfileEdit Event 추가
  return (
    <>
      <MyPageProfileBox>
        <ProfileImgBox size="profile">
          <ProfileImg size="profile" />
          <ProfileImgEdit>
            <FontAwesomeIcon icon={faPenToSquare} size="2x" />
          </ProfileImgEdit>
        </ProfileImgBox>
        <MyPageProfileInfoBox>
          <MyPageProfileNickname>Sponge Bob</MyPageProfileNickname>
          <MyPageProfileInfoList>
            <MyPageProfileInfo>Location : Bikini Bottom</MyPageProfileInfo>
            <MyPageProfileInfo>Specialize : Making Hamberger</MyPageProfileInfo>
          </MyPageProfileInfoList>
          <MyPageProfileDescription>
            한 줄 소개 입니다.
          </MyPageProfileDescription>
        </MyPageProfileInfoBox>
        <ProfileEdit>
          <FontAwesomeIcon icon={faPenToSquare} size="2x" />
        </ProfileEdit>
      </MyPageProfileBox>
    </>
  );
};

export default MyPageProfile;

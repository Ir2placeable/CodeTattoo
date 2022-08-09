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
import { getCookie } from "../../../config/cookie";

const MyPageProfile = ({ profile }) => {
  // ProfileEdit Event 추가
  return (
    <>
      <MyPageProfileBox>
        <ProfileImgBox size="profile">
          <ProfileImg size="profile" src={profile.image} />
          <ProfileImgEdit>
            <FontAwesomeIcon icon={faPenToSquare} size="2x" />
          </ProfileImgEdit>
        </ProfileImgBox>
        <MyPageProfileInfoBox>
          <MyPageProfileNickname>{profile.nickname}</MyPageProfileNickname>
          <MyPageProfileInfoList>
            {profile.location ? (
              <MyPageProfileInfo>
                Location : {profile.location}
              </MyPageProfileInfo>
            ) : null}
            {profile.specialize ? (
              <MyPageProfileInfo>
                Specialize : {profile.specialize}
              </MyPageProfileInfo>
            ) : null}
          </MyPageProfileInfoList>
          {profile.description ? (
            <MyPageProfileDescription>
              {profile.description}
            </MyPageProfileDescription>
          ) : null}
        </MyPageProfileInfoBox>
        <ProfileEdit>
          <FontAwesomeIcon icon={faPenToSquare} size="2x" />
        </ProfileEdit>
      </MyPageProfileBox>
    </>
  );
};

export default React.memo(MyPageProfile);

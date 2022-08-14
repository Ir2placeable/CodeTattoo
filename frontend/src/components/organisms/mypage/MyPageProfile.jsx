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
import { useNavigate } from "react-router-dom";

const MyPageProfile = ({ profile }) => {
  // ProfileEdit Event 추가
  const navigate = useNavigate();
  const goEdit = () => {
    navigate("/edit/profile");
  };

  return (
    <>
      <MyPageProfileBox>
        <ProfileImgBox size="profile">
          <ProfileImg size="profile" src={profile.image} />
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
        {getCookie("tattooist_id") === profile.tattooist_id ? (
          <ProfileEdit onClick={goEdit}>
            <FontAwesomeIcon icon={faPenToSquare} size="2x" />
          </ProfileEdit>
        ) : null}
      </MyPageProfileBox>
    </>
  );
};

export default React.memo(MyPageProfile);

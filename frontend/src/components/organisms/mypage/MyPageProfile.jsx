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
  ProfileImgIcon,
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { getCookie } from "../../../config/cookie";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const MyPageProfile = ({ profile }) => {
  // ProfileEdit Event 추가
  const navigate = useNavigate();
  const goEdit = () => {
    navigate("/edit/image");
  };

  return (
    <>
      <MyPageProfileBox>
        <ProfileImgBox size="profile">
          {profile.image ? (
            <ProfileImg size="profile" src={profile.image} />
          ) : (
            <ProfileImgIcon size="profile">
              <FontAwesomeIcon style={{ fontSize: "100px" }} icon={faUser} />
            </ProfileImgIcon>
          )}
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
        {getCookie("tattooist_id") === profile.tattooist_id ||
        getCookie("user_id") === profile.user_id ? (
          <ProfileEdit onClick={goEdit}>
            <FontAwesomeIcon icon={faPenToSquare} size="2x" />
          </ProfileEdit>
        ) : null}
      </MyPageProfileBox>
    </>
  );
};

export default React.memo(MyPageProfile);

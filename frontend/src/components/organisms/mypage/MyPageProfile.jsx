import React, { useEffect, useState } from "react";
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
  TattooistInfoUnitBox,
  TattooistInfoTitle,
  TattooistInfoText,
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { getCookie } from "../../../config/cookie";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const MyPageProfile = ({ profile }) => {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const user = getCookie("user_id");
    const tattooist = getCookie("tattooist_id");
    if (profile) {
      if (user) {
        if (user === profile.user_id) {
          setEdit(true);
        }
      } else if (tattooist) {
        if (tattooist == profile.tattooist_id) {
          setEdit(true);
        }
      }
    }
  }, [profile]);
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
          {/* <MyPageProfileInfoList>
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
          </MyPageProfileInfoList> */}

          <TattooistInfoUnitBox
            style={{
              padding: "0",
            }}
          >
            {profile.location && (
              <>
                <TattooistInfoTitle type="location">위치</TattooistInfoTitle>
                <TattooistInfoText type="small">
                  {profile.location}
                </TattooistInfoText>
              </>
            )}
            {profile.specialize && (
              <>
                <TattooistInfoTitle type="specialize">
                  특화분야
                </TattooistInfoTitle>
                <TattooistInfoText type="small">
                  {profile.specialize}
                </TattooistInfoText>
              </>
            )}
          </TattooistInfoUnitBox>

          {profile.description ? (
            <MyPageProfileDescription>
              {profile.description}
            </MyPageProfileDescription>
          ) : null}
        </MyPageProfileInfoBox>

        {edit ? (
          <ProfileEdit onClick={goEdit}>
            <FontAwesomeIcon icon={faPenToSquare} size="2x" />
          </ProfileEdit>
        ) : null}
      </MyPageProfileBox>
    </>
  );
};

export default React.memo(MyPageProfile);

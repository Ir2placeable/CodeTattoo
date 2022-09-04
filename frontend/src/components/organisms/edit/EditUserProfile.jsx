import axios from "axios";
import React, { useState, useRef } from "react";
import { APIURL } from "../../../config/key";
import { getCookie, removeCookie, setCookie } from "../../../config/cookie";
import {
  ProfileInfoInput,
  ProfileInfoInputBox,
  ProfileInfoInputLabel,
} from "../../../styledComponents";
import ProfileUploadBtn from "../../atomic/edit/ProfileUploadBtn";

const EditUserProfile = () => {
  const [info, setInfo] = useState({
    nickname: getCookie("nickname"),
    location: getCookie("location"),
  });

  const nicknameInput = useRef();
  const locationInput = useRef();
  const { nickname, location } = info;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const sendRequest = async () => {
    const res = await axios.patch(
      `${APIURL}/user/my-page/${getCookie("user_id")}`,
      {
        nickname: nickname,
        location: location,
      }
    );

    if (res.data.success) {
      pushCookie();
      alert("프로필 수정 성공");
      if(getCookie("user_id")) {
        window.location.replace(`/my-page/user/${getCookie("user_id")}`)
      } else {
        window.location.replace(`/tattooist/${getCookie("tattooist_id")}/draft`)
      }
    } else {
      alert("프로필 수정 실패");
    }
  };

  const pushCookie = () => {
    removeCookie("nickname");
    removeCookie("location");

    setCookie("nickname", info.nickname, { maxAge: 3000, path: "/" });
    setCookie("location", info.location, { maxAge: 3000, path: "/" });
  };

  const onSubmit = () => {
    if (nickname && location) {
      sendRequest();
    } else {
      alert("모든 정보를 입력해주세요");
    }
  };
  return (
    <>
      <ProfileInfoInputBox>
        <ProfileInfoInputLabel htmlFor="input-nickname">
          Nickname
        </ProfileInfoInputLabel>
        <ProfileInfoInput
          type="text"
          name="nickname"
          id="input-nickname"
          onChange={onChange}
          value={nickname}
          ref={nicknameInput}
        />
      </ProfileInfoInputBox>
      <ProfileInfoInputBox>
        <ProfileInfoInputLabel htmlFor="input-location">
          Location
        </ProfileInfoInputLabel>
        <ProfileInfoInput
          type="text"
          name="location"
          id="input-location"
          onChange={onChange}
          value={location}
          ref={locationInput}
        />
      </ProfileInfoInputBox>

      <ProfileUploadBtn onSubmit={onSubmit} type="profile" text="등록" />
    </>
  );
};

export default EditUserProfile;

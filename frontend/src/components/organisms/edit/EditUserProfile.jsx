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
import { goMyPage, goTattooistDetail } from "../../../config/navigate";

/** 상위 컴포넌트 === ProfileEdit.jsx
 * 프로필 편집 페이지 / 타투이스트 프로필 편집
 */

const EditUserProfile = () => {
  // 프로필 데이터
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

  // 유저 프로필 편집 요청 API
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
        goMyPage(getCookie("user_id"));
      } else {
        goTattooistDetail(getCookie("tattooist_id"));
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
      {/* 유저 프로필 정보 입력란 */}
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
          maxLength="12"
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
      {/* 등록 버튼 */}
      <ProfileUploadBtn onSubmit={onSubmit} type="profile" text="등록" />
    </>
  );
};

export default EditUserProfile;

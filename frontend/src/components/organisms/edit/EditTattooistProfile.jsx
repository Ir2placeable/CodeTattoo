import axios from "axios";
import React, { useState, useRef } from "react";
import { APIURL } from "../../../config/key";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "../../../config/cookie";
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

const EditTattooistProfile = () => {

  // 프로필 데이터
  const [info, setInfo] = useState({
    nickname: getCookie("nickname"),
    location: getCookie("profile_location"),
    specialize: getCookie("profile_specialize"),
    description: getCookie("profile_desc"),
    kakao_id: getCookie("kakao_id")
  });

  const nicknameInput = useRef();
  const locationInput = useRef();
  const specializeInput = useRef();
  const descriptionInput = useRef();
  const kakaoInput = useRef();

  const { nickname, location, specialize, description, kakao_id } = info;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  // 타투이스트 프로필 편집 요청 API
  const sendRequest = async () => {
    const res = await axios.patch(
      `${APIURL}/tattooist/my-page/${getCookie("tattooist_id")}`,
      {
        nickname: nickname,
        location: location,
        specialize: specialize,
        description: description,
        kakao_id: kakao_id
      }
    );
    
    if (res.data.success) {
      console.log("프로필 수정 성공");
      pushCookie();
      if(getCookie("user_id")) {
        goMyPage(getCookie("user_id"));
      } else {
        goTattooistDetail(getCookie("tattooist_id"));
      }
    } else {
      console.log("프로필 수정 실패");
    }
  };

  const pushCookie = () => {
    // removeCookie("nickname");
    // removeCookie("profile_location");
    // removeCookie("profile_specialize");
    // removeCookie("profile_des");
    // removeCookie("kakao_id")

    setCookie("nickname", info.nickname, { maxAge: 3000, path: "/" });
    setCookie("profile_location", info.location, { maxAge: 3000, path: "/" });
    setCookie("profile_specialize", info.specialize, { maxAge: 3000, path: "/", });
    setCookie("profile_desc", info.description, { maxAge: 3000, path: "/" });
    setCookie("kakao_id", info.kakao_id)
  };

  const onSubmit = () => {
    // if (nickname && location && specialize && description) {
    //   sendRequest();
    // } else {
    //   alert("모든 정보를 입력해주세요");
    // }
    sendRequest();
  };
  return (
    <>
     {/* 타투이스트 프로필 정보 입력란 */}
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
          maxLength="11"
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

      <ProfileInfoInputBox>
        <ProfileInfoInputLabel htmlFor="input-specialize">
          Specialize
        </ProfileInfoInputLabel>
        <ProfileInfoInput
          type="text"
          name="specialize"
          id="input-specialize"
          onChange={onChange}
          value={specialize}
          ref={specializeInput}
        />
      </ProfileInfoInputBox>

      <ProfileInfoInputBox>
        <ProfileInfoInputLabel htmlFor="input-description">
          Description
        </ProfileInfoInputLabel>
        <ProfileInfoInput
          type="text"
          name="description"
          id="input-description"
          onChange={onChange}
          value={description}
          ref={descriptionInput}
        />
      </ProfileInfoInputBox>

      <ProfileInfoInputBox>
        <ProfileInfoInputLabel htmlFor="input-kakao_id">
          KaKao ID
        </ProfileInfoInputLabel>
        <ProfileInfoInput
          type="text"
          name="kakao_id"
          id="input-kakao_id"
          onChange={onChange}
          value={kakao_id}
          ref={kakaoInput}
        />
      </ProfileInfoInputBox>
      {/* 등록 버튼 */}
      <ProfileUploadBtn onSubmit={onSubmit} type="profile" text="등록" />
    </>
  );
};

export default EditTattooistProfile;

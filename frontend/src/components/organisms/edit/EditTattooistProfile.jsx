import axios from "axios";
import React, { useState, useRef } from "react";
import { APIURL } from "../../../config/key";
import {
  getAllCookie,
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

const EditTattooistProfile = () => {
  const [info, setInfo] = useState({
    nickname: getCookie("nickname"),
    location: getCookie("profile_location"),
    specialize: getCookie("profile_specialize"),
    description: getCookie("profile_desc"),
  });

  const nicknameInput = useRef();
  const locationInput = useRef();
  const specializeInput = useRef();
  const descriptionInput = useRef();

  const { nickname, location, specialize, description } = info;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const sendRequest = async () => {
    const res = await axios.patch(
      `${APIURL}/tattooist/my-page/${getCookie("tattooist_id")}`,
      {
        nickname: nickname,
        location: location,
        specialize: specialize,
        description: description,
      }
    );
    
    if (res.data.success) {
      console.log("프로필 수정 성공");
      pushCookie();
      if(getCookie("user_id")) {
        window.location.replace(`/my-page/user/${getCookie("user_id")}`)
      } else {
        window.location.replace(`/tattooist/${getCookie("tattooist_id")}/draft`)
      }
    } else {
      console.log("프로필 수정 실패");
    }
  };

  const pushCookie = () => {
    removeCookie("nickname");
    removeCookie("profile_location");
    removeCookie("profile_specialize");
    removeCookie("profile_des");

    setCookie("nickname", info.nickname, { maxAge: 3000, path: "/" });
    setCookie("profile_location", info.location, { maxAge: 3000, path: "/" });
    setCookie("profile_specialize", info.specialize, { maxAge: 3000, path: "/", });
    setCookie("profile_desc", info.description, { maxAge: 3000, path: "/" });
  };

  const onSubmit = () => {
    if (nickname && location && specialize && description) {
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

      <ProfileUploadBtn onSubmit={onSubmit} type="profile" text="등록" />
    </>
  );
};

export default EditTattooistProfile;

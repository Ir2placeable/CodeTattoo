import axios from "axios";
import React, { useState, useRef } from "react";
import { APIURL } from "../../../config/key";
import { getCookie } from "../../../config/cookie";
import {
  ProfileInfoInput,
  ProfileInfoInputBox,
  ProfileInfoInputLabel,
} from "../../../styledComponents";
import ProfileUploadBtn from "../../atomic/edit/ProfileUploadBtn";

const EditUserProfile = () => {
  const [info, setInfo] = useState({
    nickname: "",
    location: "",
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
      console.log("프로필 수정 성공");
      window.location.replace("/edit/profile");
    } else {
      console.log("프로필 수정 실패");
    }
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

      <ProfileUploadBtn onSubmit={onSubmit} type="profile" />
    </>
  );
};

export default EditUserProfile;

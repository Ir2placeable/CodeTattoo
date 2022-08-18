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

const EditTattooistProfile = () => {
  const [info, setInfo] = useState({
    nickname: "",
    location: "",
    specialize: "",
    description: "",
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
    console.log(res);
    if (res.data.success) {
      console.log("프로필 수정 성공");
      window.location.replace("/edit/profile");
    } else {
      console.log("프로필 수정 실패");
    }
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

      <ProfileUploadBtn onSubmit={onSubmit} type="profile" />
    </>
  );
};

export default EditTattooistProfile;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef } from "react";
import {
  ProfileFormBox,
  ProfileInfoInputBox,
  ProfileInfoInput,
  ProfileInfoInputLabel,
  EyeIconBox,
} from "../../styledComponents";
import { getAllCookie, resetCookie } from "../../config/cookie";
import ProfileUploadBtn from "../atomic/edit/ProfileUploadBtn";
import EyeIcon from "../atomic/edit/EyeIcon";
import useSignOut from "../../hooks/useSignOut";

const DeleteAccount = () => {
  const [eyeClick, setEyeClick] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const emailInput = useRef();
  const passwordInput = useRef();

  const { email, password } = info;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const useSubmit = () => {
    const success = useSignOut(email, password);
    if (success) {
      // 로그아웃 → 메인 페이지 이동
      const keys = Object.keys(getAllCookie());
      console.log(keys);
      for (let i = 0; i < keys.length; i++) {
        resetCookie(keys[i]);
      }

      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    } else {
      alert("회원 탈퇴 실패");
    }
  };

  const onEyeClick = () => {
    setEyeClick(eyeClick ? false : true);
  };
  return (
    <>
      <ProfileFormBox>
        <ProfileInfoInputBox>
          <ProfileInfoInputLabel htmlFor="input-email">
            Email
          </ProfileInfoInputLabel>
          <ProfileInfoInput
            type="text"
            name="email"
            id="input-email"
            onChange={onChange}
            value={email}
            ref={emailInput}
          />
        </ProfileInfoInputBox>
        <ProfileInfoInputBox>
          <ProfileInfoInputLabel htmlFor="input-password">
            Password
          </ProfileInfoInputLabel>
          <ProfileInfoInput
            type={eyeClick ? "text" : "password"}
            name="password"
            id="input-password"
            onChange={onChange}
            value={password}
            ref={passwordInput}
          />

          <EyeIconBox onClick={onEyeClick}>
            <EyeIcon icon={eyeClick ? faEye : faEyeSlash} />
          </EyeIconBox>
        </ProfileInfoInputBox>

        <ProfileUploadBtn onSubmit={useSubmit} type="delete" text="계정 삭제" />
      </ProfileFormBox>
    </>
  );
};

export default DeleteAccount;

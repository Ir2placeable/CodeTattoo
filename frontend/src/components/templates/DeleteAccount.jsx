import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef } from "react";
import {
  ProfileFormBox,
  ProfileInfoInputBox,
  ProfileInfoInput,
  ProfileInfoInputLabel,
  EyeIconBox,
} from "../../styledComponents";
import { getAllCookie, getCookie, resetCookie } from "../../config/cookie";
import ProfileUploadBtn from "../atomic/edit/ProfileUploadBtn";
import EyeIcon from "../atomic/edit/EyeIcon";
import axios from "axios";
import { APIURL } from "../../config/key";
import Loader from "../atomic/common/Loader";

/** 
 * 상위 컴포넌트 === ShowProfileEdit.jsx
 * 회원 탈퇴 템플릿 
 */

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
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
  
  /** 회원 탈퇴 요청 API
   * @param {String} email 
   * @param {String} pwd 
   */
  const sendDeleteRequest = async (email, pwd) => {
    setLoading(true);
    let type = "";
    if (getCookie("user_id")) {
      type = "user";
    } else if (getCookie("tattooist_id")) {
      type = "tattooist";
    }
    const res = await axios.post(`${APIURL}/sign-out/${type}`, {
      email,
      pwd,
    });

    if (res.data.success) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = () => {
    const deleteSuccess = sendDeleteRequest(email, password);

    setTimeout(() => {
      if (deleteSuccess) {
        // 로그아웃 → 메인 페이지 이동
        const keys = Object.keys(getAllCookie());
        for (let i = 0; i < keys.length; i++) {
          resetCookie(keys[i]);
        }

        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      } else {
        alert("회원 탈퇴 실패");
        setLoading(false);
      }
    }, 2000);
  };

  const onEyeClick = () => {
    setEyeClick(eyeClick ? false : true);
  };

  if (loading) {
    return <Loader type="spin" color="#000000" />;
  }

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

        <ProfileUploadBtn onSubmit={onSubmit} type="delete" text="계정 삭제" />
      </ProfileFormBox>
    </>
  );
};

export default DeleteAccount;

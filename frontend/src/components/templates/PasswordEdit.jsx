import React, { useState, useRef, useEffect } from "react";
import {
  ProfileFormBox,
  ProfileInfoInputBox,
  PasswordInputLabel,
  ProfileInfoInput,
  EyeIconBox,
} from "../../styledComponents";
import ProfileUploadBtn from "../atomic/edit/ProfileUploadBtn";
import EyeIcon from "../atomic/edit/EyeIcon";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../../config/cookie";
import axios from "axios";
import { APIURL } from "../../config/key";
import Loader from "../atomic/common/Loader";
import { goMyPage, goTattooistDetail } from "../../config/navigate";

/**
 * 상위 컴포넌트 === ShowProfileEdit.jsx
 * 비밀번호 변경 템플릿
 */

const PasswordEdit = () => {
  const [info, setInfo] = useState({
    email: getCookie("email"),
    currentPwd: "",
    newPwd1: "",
    newPwd2: "",
  });

  const { email, currentPwd, newPwd1, newPwd2 } = info;

  const [eyeClick, setEyeClick] = useState(false);
  // 로딩 여부
  const [loading, setLoading] = useState(false);

  // 비밀번호 8자 미만일 시 true -> 비밀번호 재입력칸 비활성화
  const [isPwdRight, setIsPwdRight] = useState(false);
  // 비밀번호 재입력 일치하지 않았을 때
  const [isPwdDiff, setIsPwdDiff] = useState(false);

  // 비밀번호 유효성 검사
  useEffect(() => {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    // 형식에 맞는 경우 true 리턴
    if (regExp.test(newPwd1)) {
      setIsPwdRight(true);
    } else {
      setIsPwdRight(false);
    }
  }, [newPwd1]);

  // 비밀번호 재입력 유효성 검사
  useEffect(() => {
    if (newPwd2 === "") {
      setIsPwdDiff(true);
      return;
    }

    if (newPwd2 !== newPwd1) {
      setIsPwdDiff(true);
    } else {
      setIsPwdDiff(false);
    }
  }, [newPwd2]);

  const onEyeClick = () => {
    setEyeClick(eyeClick ? false : true);
  };

  const currentPwdInput = useRef();
  const newPwd1Input = useRef();
  const newPwd2Input = useRef();

  const onChange = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  /** 로그인 요청 API 
   * @param {String} email 이메일
   * @param {String} pwd 현재 패스워드
   * @returns 
   */
  const sendLoginRequest = async (email, pwd) => {
    setLoading(true);
    let type = "";
    if (getCookie("user_id")) {
      type = "user";
    } else if (getCookie("tattooist_id")) {
      type = "tattooist";
    }

    const res = await axios.post(`${APIURL}/login/${type}`, {
      email,
      pwd,
    });

    if (res.data.success) {
      console.log("success login");
      return true;
    } else {
      return false;
    }
  };

  // 로그인 성공 시, 비밀번호 변경 요청 가능
  /** 비밀번호 변경 API
   * @param {String} pwd 변경 패스워드
   */
  const sendPwdRequest = async (pwd) => {
    let type = "";
    let id = "";
    if (getCookie("user_id")) {
      type = "user";
      id = getCookie("user_id");
    } else if (getCookie("tattooist_id")) {
      type = "tattooist";
      id = getCookie("tattooist_id");
    }

    const res = await axios.patch(`${APIURL}/${type}/pwd/${id}`, {
      pwd,
    });

    if (res.data.success) {
      alert("비밀번호 변경 성공!");
      if(getCookie("user_id")) {
        goMyPage(getCookie("user_id"));
      } else {
        goTattooistDetail(getCookie("tattooist_id"));
      }
    } else {
      alert("비밀번호 변경 실패!");
    }
    setLoading(false);
  };

  const onSubmit = () => {
    const loginSuccess = sendLoginRequest(email, currentPwd);
    setTimeout(() => {
      if (loginSuccess) {
        if (isPwdRight && !isPwdDiff) {
          sendPwdRequest(newPwd1);
        } else {
          alert("새 비밀번호를 확인 해주세요");
          setLoading(false);
        }
      } else {
        alert("로그인 정보가 일치하지 않습니다");
        setLoading(false);
      }
    }, 2000);
  };

  if (loading) {
    return <Loader type="spin" color="#000000" />;
  }

  return (
    <>
      <ProfileFormBox>
        <ProfileInfoInputBox>
          <PasswordInputLabel htmlFor="input-current-pwd">
            현재 비밀번호
          </PasswordInputLabel>
          <ProfileInfoInput
            type={eyeClick ? "text" : "password"}
            id="input-current-pwd"
            name="currentPwd"
            onChange={onChange}
            value={currentPwd}
            ref={currentPwdInput}
          />
          <EyeIconBox onClick={onEyeClick}>
            <EyeIcon icon={eyeClick ? faEye : faEyeSlash} />
          </EyeIconBox>
        </ProfileInfoInputBox>

        <ProfileInfoInputBox type="password">
          <PasswordInputLabel htmlFor="input-new-pwd1">
            새로운 비밀번호
          </PasswordInputLabel>
          <ProfileInfoInput
            type="password"
            id="input-new-pwd1"
            name="newPwd1"
            placeholder="영문, 숫자 조합 8~16자"
            autoComplete="nope"
            onChange={onChange}
            value={newPwd1}
            ref={newPwd1Input}
          />
        </ProfileInfoInputBox>

        <ProfileInfoInputBox>
          <PasswordInputLabel htmlFor="input-new-pwd2">
            비밀번호 확인
          </PasswordInputLabel>
          <ProfileInfoInput
            type="password"
            id="input-new-pwd2"
            name="newPwd2"
            placeholder="비밀번호 재입력"
            autoComplete="nope"
            onChange={onChange}
            value={newPwd2}
            ref={newPwd2Input}
          />
        </ProfileInfoInputBox>
        <ProfileUploadBtn onSubmit={onSubmit} type="profile" text="변경" />
      </ProfileFormBox>
    </>
  );
};

export default PasswordEdit;

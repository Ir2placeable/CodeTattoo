import React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { EntryBtnDiv } from "../../../styledComponents";

/** 상위 컴포넌트 === EntryBtns.jsx
 * 엔트리 페이지 / 엔트리 버튼
 * @param {String} text 엔트리 버튼 텍스트
 */

const EntryBtn = ({ text }) => {
  const navigate = useNavigate();
  // URL 이동
  const onClick = useCallback(() => {
    if (text === "로그인") {
      navigate("/login");
    } else if (text === "회원가입") {
      navigate("/register");
    } else if (text === "둘러보기") {
      navigate("/drafts/best");
    }
  }, []);

  return (
    <>
      <EntryBtnDiv onClick={onClick}>{text}</EntryBtnDiv>
    </>
  );
};

export default EntryBtn;

import React from "react";
import { useCallback } from "react";
import { goDraftList, goLogin, goRegister } from "../../../config/navigate";
import { EntryBtnDiv } from "../../../styledComponents";

/** 상위 컴포넌트 === EntryBtns.jsx
 * 엔트리 페이지 / 엔트리 버튼
 * @param {String} text 엔트리 버튼 텍스트
 */

const EntryBtn = ({ text }) => {
  // URL 이동
  const onClick = useCallback(() => {
    if (text === "로그인") {
      goLogin();
    } else if (text === "회원가입") {
      goRegister();
    } else if (text === "둘러보기") {
      goDraftList();
    }
  }, []);

  return (
    <>
      <EntryBtnDiv onClick={onClick}>{text}</EntryBtnDiv>
    </>
  );
};

export default EntryBtn;

import React, { useEffect, useState } from "react";
import {
  HeaderDiv,
  HeaderInner,
  HeaderTitle,
  HeaderSubMenu,
  HeaderLogo,
  HeaderText,
  HeaderBtn,
} from "../../../styledComponents";
import HeaderBtnComp from "../../atomic/header/HeaderBtnComp";
import { getCookie } from "../../../config/cookie";
import LogoutBtn from "../../atomic/header/LogoutBtn";
import GoMypage from "../../atomic/header/GoMypage";
import { useLocation } from "react-router-dom";
import { goDraftList, goChatting } from "../../../config/navigate";

/** 헤더 */

const Header = () => {
  // 로그인 여부
  const [isLogin, setIsLogin] = useState(false);
  const path = useLocation().pathname;

  useEffect(() => {
    if (getCookie("user_id") || getCookie("tattooist_id")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [getCookie("user_id"), getCookie("tattooist_id")]);

  // 메인 페이지 이동
  const goHome = () => {
    goDraftList();
  };

  // 채팅 페이지 이동
  const goChattingPage = () => {
    let id = getCookie('user_id');

    if(!id){
      id = getCookie('tattooist_id')
    }
    goChatting(id);
  }

  return (
    <>
      <HeaderDiv>
        <HeaderInner>
          <HeaderTitle onClick={goHome}>
            {/* Code Tattoo */}
            <HeaderLogo src="../../img/logo-en.png" />
            <HeaderText>Code Tattoo</HeaderText>
          </HeaderTitle>

          {isLogin ? (
            <HeaderSubMenu>
              <HeaderBtn type="chat" onClick={goChattingPage}>
                채팅
              </HeaderBtn>
              <GoMypage />
              <LogoutBtn />
            </HeaderSubMenu>
          ) : (
            path !== "/" && (
              <HeaderSubMenu>
                <HeaderBtnComp path="login" text="로그인" />
                <HeaderBtnComp path="register" text="회원가입" />
              </HeaderSubMenu>
            )
          )}
        </HeaderInner>
      </HeaderDiv>
    </>
  );
};

export default React.memo(Header);

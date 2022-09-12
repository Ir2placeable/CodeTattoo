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
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const path = useLocation().pathname;

  useEffect(() => {
    if (getCookie("user_id") || getCookie("tattooist_id")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [getCookie("user_id"), getCookie("tattooist_id")]);

  const goHome = () => {
    window.location.replace("/#/drafts/best");
  };

  const navigate = useNavigate();
  const goChatting = () => {
    let id = getCookie('user_id');

    if(!id){
      id = getCookie('tattooist_id')
    }

    navigate(`/chat/${id}`)
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
              <HeaderBtn type="chat" onClick={goChatting}>
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

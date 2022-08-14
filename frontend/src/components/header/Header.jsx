import React, { useEffect, useState } from "react";
import {
  HeaderDiv,
  HeaderInner,
  HeaderTitle,
  HeaderSubMenu,
  HeaderLogo, 
  HeaderText
} from '../../styledComponents';
import HeaderBtnComp from './HeaderBtnComp';
import { getAllCookie, getCookie } from '../../config/cookie';
import LogoutBtn from './LogoutBtn';
import GoMypage from './GoMypage';
import { Cookies } from 'react-cookie';
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const path = useLocation().pathname;

  useEffect(() => {
    if (getCookie("user_id") || getCookie("tattooist_id")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [getCookie('user_id'), getCookie('tattooist_id')]);


  const goHome = () => {
    window.location.replace("/drafts/best");
  };

  return (
    <>
      <HeaderDiv>
        <HeaderInner>

          <HeaderTitle onClick={goHome}>
            {/* Code Tattoo */}
            <HeaderLogo src="../../img/logo-en.png" />
            <HeaderText>
              Code Tattoo
            </HeaderText>
          </HeaderTitle>

          {isLogin ? (
            <HeaderSubMenu>
              {/* <HeaderBtnComp text={"예약조회"} /> */}
              <GoMypage />
              <LogoutBtn />
            </HeaderSubMenu>
          ) : path !== '/' && (
            <HeaderSubMenu>
              <HeaderBtnComp path="login" text="로그인" />
              <HeaderBtnComp path="register" text="회원가입" />
            </HeaderSubMenu>
          )}
        </HeaderInner>
      </HeaderDiv>
    </>
  );
};

export default React.memo(Header);

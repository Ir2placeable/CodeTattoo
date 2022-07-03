import React, { useEffect, useState } from 'react';
import { 
  HeaderDiv,
  HeaderInner,
  HeaderTitle,
  HeaderSubMenu,
} from '../../styledComponents';
import HeaderBtnComp from './HeaderBtnComp';

const Header = ({ cookies, removeCookie }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {

    if(cookies.user_id || cookies.tattooist_id){
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

  }, []);

  const goHome = () => {
    window.location.replace('/')
  }

  return (
    <>
      <HeaderDiv>

        <HeaderInner>

          <HeaderTitle onClick={goHome}>Code Tattoo</HeaderTitle>

          { isLogin ? (
            <HeaderSubMenu>
              <HeaderBtnComp text={"예약조회"} />
              <HeaderBtnComp text={"내 정보"} cookies={cookies} />
              <HeaderBtnComp text={"로그아웃"} cookies={cookies} removeCookie={removeCookie} />
            </HeaderSubMenu>
          ) : (
            <HeaderSubMenu>
              <HeaderBtnComp text={"로그인"} />
              <HeaderBtnComp text={"회원가입"} />
            </HeaderSubMenu>
          )}
          

        </HeaderInner>

      </HeaderDiv>
    </>
  );
};

export default React.memo(Header);
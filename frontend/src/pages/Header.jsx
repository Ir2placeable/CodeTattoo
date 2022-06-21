import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Btn from './Btn';
import { HeaderDiv, HeaderInner, HeaderSubMenu, HeaderTitle } from '../styledComponents';


const Header = ({ cookies, removeCookie }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    // 쿠키에 user_id 값이 있으면
    console.log('header에서 쿠키: ', cookies.user_id)
    if(cookies.user_id){
      // 로그아웃 & 마이페이지 & for tattooist 버튼 보이기
      setIsLogin(true);
    } else {
      // 쿠키에 없으면 로그인 & 회원가입 버튼 보이기 
      setIsLogin(false);
    }
  }, [])

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  const goLogin = () => {
    navigate('/login');
  }
  const goRegister = () => {
    navigate('/register')
  }
  const goTattooistEnroll = () => {
    navigate('/tattooist_enrollment');
  }
  const goLogout = async() => {
    alert('로그아웃 하시겠습니까?');

    const keys = Object.keys(cookies);
    console.log(keys)
    for(let i=0; i<keys.length; i++){
      removeCookie(keys[i]);
    }
    window.location.replace('/');
  }

  // <Route path="/user/mypage/:user_id" />
  // <Route path="/tatooist/mypage/:tattooist_id" />
  const goMyPage = () => {
    if(cookies.isTattooist){
      navigate(`/tattooist/mypage/${cookies.isTattooist}`);
    } else {
      navigate(`/user/mypage/${cookies.user_id}`)
    }
  }

  return (
    <>
      <HeaderDiv>
        <HeaderInner>
          <HeaderTitle>
            <span onClick={goHome}>Code Tattoo</span>
          </HeaderTitle>

          { isLogin ? (
            <HeaderSubMenu>
              <Btn text={'Logout'} onClick={goLogout} />
              <Btn text={'My page'} onClick={goMyPage} />
              <Btn text={'for Tattooist'} onClick={goTattooistEnroll} />
            </HeaderSubMenu>
          ) : (
            <HeaderSubMenu>
              <Btn text={'Login'} onClick={goLogin} />
              <Btn text={'Sign up'} onClick={goRegister} />
            </HeaderSubMenu>
          )}
          
        </HeaderInner>
      </HeaderDiv>
    </>
  );
};

export default React.memo(Header);
//export default Header;
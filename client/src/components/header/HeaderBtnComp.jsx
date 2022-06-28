import React, { useState } from 'react';
import { HeaderBtn, HeaderBtnHover } from '../../style/styledComponents';
import { useNavigate } from 'react-router-dom'

const HeaderBtnComp = ({ text, cookies, removeCookie }) => {
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();
  const onClick = () => {
    if(text === "예약조회"){

    } else if(text === "내 정보"){

    } else if(text === "로그아웃"){
      alert('로그아웃 하시겠습니까?')

      const keys = Object.keys(cookies);
      for(let i = 0; i < keys.length; i++){
        removeCookie(keys[i]);
      }

      setTimeout(() => {
        window.location.replace('/')
      }, 3000);

    } else if(text === "로그인"){
      navigate('/login');
    } else if(text === "회원가입"){
      navigate('/register');
    }
  }

  return (
    <>
      <HeaderBtn
        style={isHover ? HeaderBtnHover : {}}
        onMouseEnter={() => { setIsHover(true) }}
        onMouseLeave={() => { setIsHover(false) }}
        onClick={onClick}
      >
        {text}
      </HeaderBtn>
    </>
  );
};

export default HeaderBtnComp;
import React, { useState } from 'react';
import { 
  AccountDiv,
  AccountText,
  AccountNavigateDiv,
  AccountNavigate,
  AccountNavigateHover,
} from '../../styledComponents';
import LoginInput from "../atomic/account/LoginInput";

/* 로그인 템플릿 */
const Login = () => {
  // 타투이스트 / 유저 구분
  const [isTattooist, setIsTattooist] = useState(false);

  // 타투이스트 로그인 / 유저 로그인 
  const onClick = (e) => {
    if(e.target.innerText === "User"){
      setIsTattooist(false);
    } else {
      setIsTattooist(true)
    }
  }

  return (
    <>
      <AccountDiv style={{marginBottom: '220px'}}>

        <AccountText>로그인</AccountText>

        <AccountNavigateDiv>
          <AccountNavigate onClick={onClick} 
            style={isTattooist ? {} : AccountNavigateHover}>
            User
          </AccountNavigate>
          <AccountNavigate onClick={onClick} 
            style={isTattooist ? AccountNavigateHover : {}}>
            Tattooist
          </AccountNavigate>
        </AccountNavigateDiv>

        <LoginInput isTattooist={isTattooist} />
      </AccountDiv>
    </>
  )
};

export default React.memo(Login);
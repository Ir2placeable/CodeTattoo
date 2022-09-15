import React, { useState } from 'react';
import { 
  AccountDiv,
  AccountText,
  AccountNavigateDiv,
  AccountNavigate,
  AccountNavigateHover,
} from '../../styledComponents';
import RegisterInput from '../atomic/account/RegisterInput';

/* 회원가입 템플릿 */

const Register = () => {
  // 타투이스트 / 유저 구분
  const [isTattooist, setIsTattooist] = useState(false);

  // 타투이스트 회원가입 / 유저 회원가입
  const onClick = (e) => {
    if(e.target.innerText === "User"){
      setIsTattooist(false);
    } else {
      setIsTattooist(true)
    }
  }

  return (
    <>
      <AccountDiv>

        <AccountText>회원가입</AccountText>

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

        <RegisterInput isTattooist={isTattooist} />
        
      </AccountDiv>
    </>
  )
};

export default React.memo(Register);
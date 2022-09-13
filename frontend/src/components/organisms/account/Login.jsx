import React, { useState, useEffect } from 'react';
import { 
  AccountDiv,
  AccountText,
  AccountNavigateDiv,
  AccountNavigate,
  AccountNavigateHover,
} from '../../../styledComponents';
import LoginInput from '../../atomic/account/LoginInput';

const Login = () => {
  const [isTattooist, setIsTattooist] = useState(false);

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
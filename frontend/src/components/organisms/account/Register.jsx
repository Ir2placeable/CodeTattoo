import React, { useState, useEffect } from 'react';
import { 
  AccountDiv,
  AccountText,
  AccountNavigateDiv,
  AccountNavigate,
  AccountNavigateHover,
} from '../../../styledComponents';
import RegisterInput from '../../atomic/account/RegisterInput';

const Register = () => {
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
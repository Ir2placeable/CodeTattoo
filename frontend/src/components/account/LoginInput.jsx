import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { APIURL } from '../../config/key';
import axios from 'axios'
import { 
  AccountInputDiv, AccountInputBox, AccountLabel,
  AccountInput, AccountBtn, AccountOtherDiv, AccountOtherBtn
} from '../../styledComponents';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../config/cookie';

const LoginInput = ({ isTattooist }) => {
  const [info, setInfo] = useState({
    email: '',
    pwd: ''
  })
  const emailInput = useRef();
  const pwdInput = useRef();

  const { email, pwd } = info;

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  const onChange = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value
    })
  }
  const onKeyUp = (e) => {
    if(e.key === "Enter"){
      if(e.target.name === 'email'){
        pwdInput.current.focus();
      } else if(e.target.name === 'pwd'){
        onSubmit();
      } 
    }
  }

  const pushCookie = (data) => {

    if(isTattooist){
      setCookie("nickname", data.tattooist_info.nickname, {maxAge: 3000, path: '/'})
      setCookie("tattooist_id", data.tattooist_info.tattooist_id, {maxAge: 3000, path: '/'})
      setCookie("profile_img_src", data.tattooist_info.image , {maxAge: 3000, path: '/'})
      setCookie("profile_desc", data.tattooist_info.description , {maxAge: 3000, path: '/'})
    } else {
      setCookie("nickname", data.user_info.nickname, {maxAge: 3000, path: '/'})
      setCookie("user_id", data.user_info.user_id, {maxAge: 3000, path: '/'})
      setCookie("profile_img_src", data.user_info.image , {maxAge: 3000, path: '/'})
      setCookie("profile_desc", data.user_info.description , {maxAge: 3000, path: '/'})
    }
    
  }

  const loginRequest = async() => {
    let _filter = "user";

    if(isTattooist){
      _filter = "tattooist";
    }

    const res = await axios.post(`${APIURL}/login/${_filter}`, {
      filter: _filter,
      email: email,
      pwd: pwd
    })

    if(res.data.success){
      // ????????? nickname, id ??????
      pushCookie(res.data);
      //console.log(res.data)

      setTimeout(() => {
        window.location.replace('/');
      }, 500)
      
    } else {
      // ????????? ?????? : email or pwd ??????
      alert('????????? ?????? ??????????????? ??????????????????.')
      window.location.replace('/login')
    }
  }
  const onSubmit = () => {
    if(!email || !pwd){
      alert('?????? ????????? ??????????????????.')
    } else {
      loginRequest();
    }
  }

  const navigate = useNavigate();
  const goRegister = () => {
    navigate('/register')
  }

  return (
    <>
      <AccountInputDiv>

        <AccountInputBox>
          <AccountInput 
            type="text"
            name="email"
            placeholder='email??? ??????????????????...'
            autoComplete='nope'
            value={email}
            ref={emailInput}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </AccountInputBox>

        <AccountInputBox>
          <AccountInput 
            type="password"
            name="pwd"
            placeholder='??????????????? ??????????????????...'
            autoComplete='nope'
            value={pwd}
            ref={pwdInput}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </AccountInputBox>

      </AccountInputDiv>

      <AccountBtn onClick={onSubmit}>
        {isTattooist ? (
          <span>Login for tattooist</span>
        ) : (
          <span>Login for user</span>
        )}
      </AccountBtn>

      <AccountOtherDiv>
        <AccountOtherBtn>???????????? ??????</AccountOtherBtn>
        <AccountOtherBtn onClick={goRegister}>????????????</AccountOtherBtn>
      </AccountOtherDiv>

    </>
  );
};

export default React.memo(LoginInput);
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { 
  LoginSection,
  LoginTextDiv,
  LoginBox,
  LoginInputDiv,
  LoginInput,
  LoginBtn 
} from '../styledComponents';

const Login = ({ apiUrl, setCookie }) => {
  const emailInput = useRef();
  const pwdInput = useRef();
  const [info, setInfo] = useState({
    email: '',
    pwd: ''
  })

  const { email, pwd } = info;

  useEffect(()=>{
    emailInput.current.focus();
  }, []);

  const onChange = (e) => {
    const {value, name} = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  }

  const onKeyUp = (e) => {
    if(e.key === 'Enter' || e.key === 'ArrowDown'){
      pwdInput.current.focus();
    }
  }

  const pushCookie = (data) => {
    setCookie('user_id', data.user_id, {maxAge:3000})
    setCookie('name', data.name, {maxAge:3000})
    setCookie('location', data.location, {maxAge:3000})
    setCookie('isTattooist', '', {maxAge:3000})
  }

  const navigate = useNavigate();
  const submitLogin = async() => {
    const body = {
      email: email,
      pwd: pwd
    }
    const res = await axios.post(`${apiUrl}/login`, body)
    console.log(res.data);

    if(res.data.success){
      pushCookie(res.data.user_info);
      //window.location.replace('/');
      console.log('쿠키 저장 성공')
      //navigate('/')
      window.location.replace('/');
    } else {
      window.location.replace('/login');
      alert('Login 정보가 잘못되었습니다. 다시 시도해주세요.')
    }
  }
  const onSubmit = () => {
    submitLogin();
  }

  return (
    <>
      <LoginSection>
        <LoginTextDiv>
          <span>Welcome! 로그인을 해주세요.</span>
        </LoginTextDiv>

        <LoginBox>
          <LoginInputDiv>
            <LoginInput
              type="email"
              placeholder='email을 입력해주세요...'
              value={email}
              name="email"
              onChange={onChange}
              ref={emailInput}
              onKeyUp={onKeyUp}
              autoComplete='nope'
             />
          </LoginInputDiv>

          <LoginInputDiv>
            <LoginInput
              type="password"
              placeholder='비밀번호를 입력해주세요...'
              value={pwd}
              name="pwd"
              onChange={onChange}
              ref={pwdInput}
              autoComplete='nope'
            />
          </LoginInputDiv>
        </LoginBox>

        <LoginBtn onClick={onSubmit}>
          <span>Login</span>
        </LoginBtn>
      </LoginSection>
    </>
  );
};

export default Login;
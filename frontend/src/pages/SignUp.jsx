import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { 
  EnrollDiv,
  EnrollBox,
  EnrollUl,
  EnrollText,
  EnrollLi,
  EnrollLabel,
  EnrollInput,
  EnrollBtn,
  EnrollBigText
} from '../styledComponents';

const divStyle = {
  marginTop: '50px',
  marginBottom: '50px'
}

const SignUp = ({ apiUrl }) => {
  const nameInput = useRef();
  const emailInput = useRef();
  const pwdInput = useRef();
  const addrInput = useRef();
  const [info, setInfo] = useState({
    name: '',
    email: '',
    pwd: '',
    addr: ''
  })

  const { name, email, pwd, addr } = info;

  useEffect(()=>{
    nameInput.current.focus();
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
      if(e.target.name === 'name'){
        emailInput.current.focus();
      } else if (e.target.name === 'email') {
        pwdInput.current.focus();
      } else if (e.target.name === 'pwd'){
        addrInput.current.focus();
      }
    }
  }

  const navigate = useNavigate();
  const submitLogin = async() => {
    const body = {
      name: name,
      email: email,
      pwd: pwd,
      location: addr
    }
    const res = await axios.post(`${apiUrl}/register`, body)
    console.log(res);

    // 이미 존재하는 이메일로 가입 시도했을 때
    if(!res.data.success){
      alert('이미 존재하는 이메일입니다.');
    } else {
      alert('회원가입 완료!')
      navigate('/login');
    }
  }

  const onSubmit = () => {
    if(!name || !email || !pwd || !addr){
      alert('모든 정보를 입력해주세요.');
    } else {
      submitLogin();
    }
  }

  return (
    <>
      <EnrollDiv style={divStyle}>

        <EnrollBox>
          <EnrollBigText>Create account</EnrollBigText>
          <EnrollUl>
            <EnrollText>회원가입</EnrollText>

            <EnrollLi>
              <EnrollLabel> 닉네임
                <EnrollInput 
                  type="text"
                  placeholder='닉네임을 입력해주세요...'
                  value={name}
                  name="name"
                  onChange={onChange}
                  ref={nameInput}
                  onKeyUp={onKeyUp}
                  autoComplete='nope'
                />
              </EnrollLabel>
            </EnrollLi>

            <EnrollLi>
              <EnrollLabel> 이메일
                <EnrollInput 
                  type="email"
                  placeholder='email을 입력해주세요...'
                  value={email}
                  name="email"
                  onChange={onChange}
                  ref={emailInput}
                  onKeyUp={onKeyUp}
                  autoComplete='nope'
                />
              </EnrollLabel>
            </EnrollLi>

            <EnrollLi>
              <EnrollLabel> 비밀번호
                <EnrollInput 
                  type="password"
                  placeholder='비밀번호를 입력해주세요...'
                  value={pwd}
                  name="pwd"
                  onChange={onChange}
                  ref={pwdInput}
                  onKeyUp={onKeyUp}
                  autoComplete='nope'
                />
              </EnrollLabel>
            </EnrollLi>

            <EnrollLi>
              <EnrollLabel> 주소
                <EnrollInput 
                  type="text"
                  placeholder='주소를 입력해주세요...'
                  value={addr}
                  name="addr"
                  onChange={onChange}
                  ref={addrInput}
                  autoComplete='nope'
                />
              </EnrollLabel>
            </EnrollLi>
          </EnrollUl>

          <EnrollBtn onClick={onSubmit}>
            <span>Sign up</span>
          </EnrollBtn>
        </EnrollBox>

      </EnrollDiv>
    </>
  );
};

export default SignUp;
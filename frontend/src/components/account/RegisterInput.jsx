import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { APIURL } from '../../config/key';
import axios from 'axios'
import { 
  AccountInputDiv, AccountInputBox, AccountLabel,
  AccountInput, AccountBtn, AccountText
} from '../../styledComponents';

const errorBox = {
  borderColor: 'red'
}

const RegisterInput = ({ isTattooist }) => {
  const [isErr, setIsErr] = useState(false);
  const [info, setInfo] = useState({
    email: '',
    pwd: '',
    pwd2: '',
    nickname: '',
    office: '',
    contact: ''
  })

  const { email, pwd, pwd2, nickname, office, contact } = info;
  const emailInput = useRef();
  const pwdInput = useRef();
  const pwd2Input = useRef();
  const nickInput = useRef();
  const officeInput = useRef();
  const contactInput = useRef();

  const onChange = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value
    })

    if(name === 'pwd'){
      if(pwd.length < 8){
        setIsErr(true);
      } else {
        setIsErr(false)
      }
    }
  }
  const onKeyUp = (e) => {
    if(e.key === "Enter"){
      if(e.target.name === 'email'){
        pwdInput.current.focus();
      } else if(e.target.name === 'pwd'){
        pwd2Input.current.focus();
      } else if(e.target.name === 'pwd2'){
        nickInput.current.focus();
      } else if(e.target.name === 'nickname') {
        if(!isTattooist){
          onSubmit();
        } else {
          officeInput.current.focus();
        }
      } else if(e.target.name === 'office') {
        contactInput.current.focus();
      } else if(e.target.name === 'contact') {
        onSubmit();
      }
    }
  }

  const onSubmit = () => {

  }
  return (
    <>
      <AccountInputDiv>

        <AccountInputBox>
          <AccountLabel>이메일 <span style={{color: 'red'}}>*</span></AccountLabel>
          <AccountInput 
            type="text"
            name="email"
            placeholder='email을 입력해주세요'
            autoComplete='nope'
            value={email}
            ref={emailInput}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </AccountInputBox>

        <AccountInputBox>
          <AccountLabel>비밀번호 <span style={{color: 'red'}}>*</span></AccountLabel>
          <AccountInput 
            type="password"
            name="pwd"
            placeholder='영문, 숫자, 특수문자 조합 최소 8자'
            autoComplete='nope'
            value={pwd}
            ref={pwdInput}
            onChange={onChange}
            onKeyUp={onKeyUp}
            style={isErr ? errorBox : {}}
          />
          <AccountInput 
            type="password"
            name="pwd2"
            placeholder='비밀번호 재입력'
            autoComplete='nope'
            value={pwd2}
            ref={pwd2Input}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </AccountInputBox>

        <AccountInputBox>
          <AccountLabel>닉네임 <span style={{color: 'red'}}>*</span></AccountLabel>
          <AccountInput 
            type="text"
            name="nickname"
            placeholder='닉네임을 입력해주세요'
            autoComplete='nope'
            value={nickname}
            ref={nickInput}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </AccountInputBox>

        {isTattooist ? (
          <div>
            <AccountInputBox>
              <AccountLabel>Office <span style={{color: 'red'}}>*</span></AccountLabel>
              <AccountInput 
                type="text"
                name="office"
                placeholder='작업실 주소'
                autoComplete='nope'
                value={office}
                ref={officeInput}
                onChange={onChange}
                onKeyUp={onKeyUp}
              />
            </AccountInputBox>
            <AccountInputBox>
              <AccountLabel>Contact <span style={{color: 'red'}}>*</span></AccountLabel>
              <AccountInput 
                type="text"
                name="contact"
                placeholder='연락처'
                autoComplete='nope'
                value={contact}
                ref={contactInput}
                onChange={onChange}
                onKeyUp={onKeyUp}
              />
            </AccountInputBox>
          </div>
        ) : (
          <div></div>
        )}

      </AccountInputDiv>

      <AccountBtn onClick={onSubmit}>
        {isTattooist ? (
          <span>Sign up for tattooist</span>
        ) : (
          <span>Sign up for user</span>
        )}
      </AccountBtn>
    </>
  );
};

export default RegisterInput;
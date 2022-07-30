import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { APIURL } from '../../config/key';
import axios from 'axios'
import { 
  AccountInputDiv, AccountInputBox, AccountLabel,
  AccountInput, AccountBtn, AccountText, InputErrorText
} from '../../styledComponents';
import { useNavigate } from 'react-router-dom';

// - POST : /register/user
// - Body : { email, pwd, nickname, location }
// - Return : { success }
// - Error code
//     - err 1 : email 중복

// - POST : /register/tattooist
// - Body : { email, pwd, nickname, location, office_detail, contact }
// - Return : { success }
// - Error code
//     - err 1 : email 중복

const RegisterInput = ({ isTattooist }) => {
  // 이메일 유효성 검사
  const [isRightEmail, setIsRightEmail] = useState(true);
  // 비밀번호 8자 미만일 시 true -> 비밀번호 재입력칸 비활성화
  const [isPwdRight, setIsPwdRight] = useState(false);
  // 비밀번호 재입력 일치하지 않았을 때
  const [isPwdDiff, setIsPwdDiff] = useState(false);

  const [info, setInfo] = useState({
    email: '',
    pwd: '',
    pwd2: '',
    nickname: '',
    location: '',
    office: '',
    contact: ''
  })

  const { email, pwd, pwd2, nickname, location, office, contact } = info;
  const emailInput = useRef();
  const pwdInput = useRef();
  const pwd2Input = useRef();
  const nickInput = useRef();
  const locInput = useRef();
  const officeInput = useRef();
  const contactInput = useRef();

  useEffect(() => {
    emailInput.current.focus();
  }, [])

  // 이메일 유효성 검사
  useEffect(() => {
    if(!email){
      setIsRightEmail(true)
      return
    }

    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    // 형식에 맞는 경우 true 리턴
    //console.log('이메일 유효성 검사 :: ', regExp.test(email))

    if(regExp.test(email)){
      setIsRightEmail(true)
    } else {
      setIsRightEmail(false)
    }

  }, [email])

  // 비밀번호 유효성 검사
  useEffect(() => {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/
    // 형식에 맞는 경우 true 리턴
    //console.log('비밀번호 유효성 검사 :: ', regExp.test(pwd))

    if(regExp.test(pwd)){
      setIsPwdRight(true);
    } else {
      setIsPwdRight(false);
    }

  }, [pwd])

  // 비밀번호 재입력 유효성 검사
  useEffect(() => {
    if(pwd2 === ''){
      setIsPwdDiff(false)
      return
    }

    if(pwd2 !== pwd){
      setIsPwdDiff(true)
    } else {
      setIsPwdDiff(false)
    }
  }, [pwd2])

  
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
        pwd2Input.current.focus();
      } else if(e.target.name === 'pwd2'){
        nickInput.current.focus();
      } else if(e.target.name === 'nickname') {
        locInput.current.focus();
      } else if(e.target.name === 'location'){
        if(!isTattooist){
          onSubmit();
        } else {
          officeInput.current.focus();
        }
      }else if(e.target.name === 'office') {
        contactInput.current.focus();
      } else if(e.target.name === 'contact') {
        onSubmit();
      }
    }
  }

  const navigate = useNavigate();
  const registerRequest = async() => {
    const body = {
      filter: 'user',
      email: email,
      pwd: pwd,
      nickname: nickname,
      location: location,
    }

    if(isTattooist){
      body.filter = 'tattooist';
      body.office = office;
      body.contact = contact;
    }

    console.log('body', body)

    const res = await axios.post(`${APIURL}/register/${body.filter}`, body)
    console.log(res)

    if(res.data.success) {
      // 회원가입 성공 : 로그인 페이지로
      alert('회원가입 성공! 환영합니다.')
      navigate('/login');
    } else {
      // 회원가입 실패 : 이메일 중복
      alert('이미 존재하는 이메일입니다.')
      //window.location.replace('/register')
    }
    
  }

  const onSubmit = () => {
    if(!email || !pwd || !nickname || (isTattooist && (!office || !contact))){
      alert('모든 정보를 입력해주세요.')
    } else if( pwd !== pwd2 ){
      alert('비밀번호가 불일치합니다.')
    } else {
      registerRequest();
    }
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

          {!isRightEmail && (
            <InputErrorText>
              올바른 이메일 표현식이 아닙니다.
            </InputErrorText>
          )}
        </AccountInputBox>

        <AccountInputBox>
          <AccountLabel>비밀번호 <span style={{color: 'red'}}>*</span></AccountLabel>
          <AccountInput 
            type="password"
            name="pwd"
            placeholder='영문, 숫자 조합 8~16자'
            autoComplete='nope'
            value={pwd}
            ref={pwdInput}
            onChange={onChange}
            onKeyUp={onKeyUp}
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
            disabled={isPwdRight ? false : true}
          />

          {isPwdDiff && (
            <InputErrorText>
              비밀번호가 일치하지 않습니다.
            </InputErrorText>
          )}
          
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

        <AccountInputBox>
          <AccountLabel>사는곳 <span style={{color: 'red'}}>*</span></AccountLabel>
          <AccountInput 
            type="text"
            name="location"
            placeholder='닉네임을 입력해주세요'
            autoComplete='nope'
            value={location}
            ref={locInput}
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

export default React.memo(RegisterInput);
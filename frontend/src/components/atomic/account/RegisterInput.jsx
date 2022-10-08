import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { APIURL } from '../../../config/key';
import axios from 'axios'
import { 
  AccountInputDiv, AccountInputBox, AccountLabel,
  AccountInput, AccountBtn, InputErrorText, KaKaoLogo
} from '../../../styledComponents';
import { goLogin } from '../../../config/navigate';

/**
 * 상위 컴포넌트 === Register.jsx
 * 회원가입 입력 감지 컴포넌트 / 회원가입 API
 * @param {boolean} isTattooist 유저/ 타투이스트 회원가입 구분 
 */
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
    contact: '',
    kakao_id: ''
  })

  const { email, pwd, pwd2, nickname, location, office, contact, kakao_id } = info;
  const emailInput = useRef();
  const pwdInput = useRef();
  const pwd2Input = useRef();
  const nickInput = useRef();
  const locInput = useRef();
  const officeInput = useRef();
  const contactInput = useRef();
  const kakaoInput = useRef();

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

    if(regExp.test(pwd)){
      setIsPwdRight(true);
    } else {
      setIsPwdRight(false);
    }

  }, [pwd])

  // 비밀번호 재입력 유효성 검사
  useEffect(() => {
    if(pwd2 === ''){
      setIsPwdDiff(true)
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
          kakaoInput.current.focus()
        } else {
          officeInput.current.focus();
        }
      }else if(e.target.name === 'office') {
        contactInput.current.focus();
      } else if(e.target.name === 'contact') {
        kakaoInput.current.focus()
      } else if(e.target.name === 'kakao_id') {
        onSubmit();
      }
    }
  }

  // 회원가입 요청 API
  const registerRequest = async() => {
    const body = {
      filter: 'user',
      email: email,
      pwd: pwd,
      nickname: nickname,
      location: location,
      kakao_id: kakao_id
    }

    if(isTattooist){
      body.filter = 'tattooist';
      body.office = office;
      body.contact = contact;
    }

    const res = await axios.post(`${APIURL}/register/${body.filter}`, body)

    if(res.data.success) {
      alert('회원가입 성공! 환영합니다.')
      goLogin();
    } else {
      alert('이미 존재하는 이메일입니다.')
    }
    
  }

  const onSubmit = () => {
    if(!email || !pwd || !nickname || (isTattooist && (!office || !contact))){
      alert('모든 정보를 입력해주세요.')
    } else if( pwd !== pwd2 ){
      alert('비밀번호가 불일치합니다.')
    } else if(!isRightEmail){
      alert('올바른 이메일 표현식이 아닙니다.')
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
            placeholder='닉네임을 입력해주세요. (12자 이내)'
            maxLength={"12"}
            autoComplete='nope'
            value={nickname}
            ref={nickInput}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </AccountInputBox>

        <AccountInputBox>
          <AccountLabel>주소지 
            {isTattooist && (
              <span style={{color: 'red'}}>*</span>
            )}
          </AccountLabel>
          <AccountInput 
            type="text"
            name="location"
            placeholder='주소지를 입력해주세요'
            autoComplete='nope'
            value={location}
            ref={locInput}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </AccountInputBox>

        {isTattooist && (
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
        )}

        <AccountInputBox>
          <AccountLabel>
            <KaKaoLogo src="../../img/kakao.png" />
            카카오톡 ID
          </AccountLabel>
          <AccountInput 
            type="text"
            name="kakao_id"
            placeholder='카카오톡 ID(알림용, 선택)'
            autoComplete='nope'
            value={kakao_id}
            ref={kakaoInput}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </AccountInputBox>

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
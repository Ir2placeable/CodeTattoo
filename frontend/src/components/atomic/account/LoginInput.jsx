import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { APIURL, KAKAOURL, PUSHURL } from '../../../config/key';
import axios from 'axios'
import { 
  AccountInputDiv, AccountInputBox, 
  AccountInput, AccountBtn, AccountOtherDiv, 
  AccountOtherBtn, KaKaoLogo, KakaoCheckDiv, KakaoCheckCircle, KakaoLoginText
} from '../../../styledComponents';
import { getCookie, setCookie } from '../../../config/cookie';
import { goDraftList, goRegister } from '../../../config/navigate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

/**
 * 상위 컴포넌트 === Login.jsx
 * 로그인 입력 감지 컴포넌트 / 로그인 API
 * @param {boolean} isTattooist 유저/ 타투이스트 회원가입 구분 
 */
const LoginInput = ({ isTattooist }) => {
  // 카카오톡 푸시 설정 클릭
  const [kakaoClick, setKakaoClick] = useState('none')
  // 로그인 데이터
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
      setCookie("email", data.tattooist_info.email , {maxAge: 3000, path: '/'})
      setCookie("nickname", data.tattooist_info.nickname, {maxAge: 3000, path: '/'})
      setCookie("tattooist_id", data.tattooist_info.tattooist_id, {maxAge: 3000, path: '/'})
      setCookie("profile_img_src", data.tattooist_info.image , {maxAge: 3000, path: '/'})
      setCookie("profile_desc", data.tattooist_info.description , {maxAge: 3000, path: '/'})
      setCookie("profile_location", data.tattooist_info.location , {maxAge: 3000, path: '/'})
      setCookie("profile_specialize", data.tattooist_info.specialize , {maxAge: 3000, path: '/'})
      setCookie("kakao_id", data.tattooist_info.kakao_id)
      return data.tattooist_info.tattooist_id
    } else {
      setCookie("email", data.user_info.email , {maxAge: 3000, path: '/'})
      setCookie("nickname", data.user_info.nickname, {maxAge: 3000, path: '/'})
      setCookie("user_id", data.user_info.user_id, {maxAge: 3000, path: '/'})
      setCookie("profile_img_src", data.user_info.image , {maxAge: 3000, path: '/'})
      setCookie("profile_location", data.user_info.location , {maxAge: 3000, path: '/'})
      setCookie("kakao_id", data.user_info.kakao_id)
      return data.user_info.user_id
    }
  }

  // Login 요청 API
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
      return [true, res.data];
    } else {
      alert('이메일 또는 비밀번호가 불일치합니다.')
      return [false, {}];
    }
  }

  const fcmToken = async() => {
    let id = getCookie('user_id');
    if(!id){
      id = getCookie('tattooist_id');
    }
    const fcm = getCookie('fcm')

    console.log(id, fcm)

    if(!id || !fcm){
      console.log('id 또는 fcm 누락')
      return false;
    }

    const res = await axios.post(`${PUSHURL}/fcm/token`, { 
      id, fcm
    })

    if(res.data.success){
      return true;
    } else {
      console.log('post fcm fail')
      console.log(res)
      return false;
    }
  }

  const onSubmit = () => {
    if(!email || !pwd){
      alert('모든 정보를 입력해주세요.')
    } else {
      loginRequest()
        .then((ret) => {
          if(ret[0]){
            const id = pushCookie(ret[1])
            goDraftList();
          }
        })
        .then(() => {
          fcmToken();
        })
        .then(() => {
          if(kakaoClick === 'click'){
            window.location.replace(KAKAOURL)
          } else {
            window.location.reload();
          }
        })
    }
  }

  const onKakao = () => {
    if(kakaoClick === 'none'){
      setKakaoClick('click')
    } else if(kakaoClick === 'click'){
      setKakaoClick('none')
    }
  }

  return (
    <>
      <AccountInputDiv>

        <AccountInputBox>
          <AccountInput 
            type="text"
            name="email"
            placeholder='email을 입력해주세요...'
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
            placeholder='비밀번호를 입력해주세요...'
            autoComplete='nope'
            value={pwd}
            ref={pwdInput}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </AccountInputBox>

      </AccountInputDiv>

      <KakaoCheckDiv>
        <KakaoCheckCircle onClick={onKakao} type={kakaoClick}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </KakaoCheckCircle>

        <KakaoLoginText >
          카카오 로그인하고 푸쉬알림 받기
          <KaKaoLogo src="../../img/kakao.png" 
            style={{marginLeft: '5px'}}
          />
        </KakaoLoginText>
        
      </KakaoCheckDiv>

      <AccountBtn onClick={onSubmit}>
        {isTattooist ? (
          <span>Login for tattooist</span>
        ) : (
          <span>Login for user</span>
        )}
      </AccountBtn>

      <AccountOtherDiv>
        <AccountOtherBtn onClick={goRegister}>회원가입</AccountOtherBtn>
      </AccountOtherDiv>

    </>
  );
};

export default React.memo(LoginInput);
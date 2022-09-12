import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { APIURL, CHATAPIURL } from '../../config/key';
import axios from 'axios'
import { 
  AccountInputDiv, AccountInputBox, AccountLabel,
  AccountInput, AccountBtn, AccountOtherDiv, AccountOtherBtn
} from '../../styledComponents';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../config/cookie';

// ### 로그인 페이지 : 유저

// - POST : /login/user
// - Body : { email, pwd }
// - Return : { success, user_info }
//     - user_info = { user_id, nickname, image }
// - Error code
//     - err 2 : email + pwd 조합 불일치
//     - err 3 : 해당 user 없음
// - [기능정리링크](https://www.notion.so/a78a53207d0740eba3637a8316c1b0a0)

// ### 로그인 페이지 : 타투이스트

// - POST : /login/tattooist
// - Body : { email, pwd }
// - Return : { success, tattooist_info }
//     - tattooist_info = { tattooist_id, nickname, image, description }
// - Error code
//     - err 2 : email + pwd 조합 불일치
//     - err 4 : 해당 tattooist 없음

const LoginInput = ({ isTattooist }) => {
  const [info, setInfo] = useState({
    email: '',
    pwd: ''
  })
  const emailInput = useRef();
  const pwdInput = useRef();
  // const [id, setId] = useState('')

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

      // setId(data.tattooist_info.tattooist_id)
      return data.tattooist_info.tattooist_id
    } else {
      setCookie("email", data.user_info.email , {maxAge: 3000, path: '/'})
      setCookie("nickname", data.user_info.nickname, {maxAge: 3000, path: '/'})
      setCookie("user_id", data.user_info.user_id, {maxAge: 3000, path: '/'})
      setCookie("profile_img_src", data.user_info.image , {maxAge: 3000, path: '/'})
      setCookie("profile_location", data.user_info.location , {maxAge: 3000, path: '/'})

      // setId(data.user_info.user_id)
      return data.user_info.user_id
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

    console.log('login response: ', res.data);

    if(res.data.success){
      return [true, res.data];
    } else {
      // 로그인 실패 : email or pwd 오류
      alert('이메일 또는 비밀번호가 불일치합니다.')
      return [false, {}];
    }
  }

//   - POST: /chat/user
// - Body : { userid }
//     - userid → 현재 로그인 성공한 유저의 id
// - return : { success }
  const sendWebSocket = async(data, id) => {
    const res = await axios.post(`${CHATAPIURL}/chat/user`, {
      userid: id
    })

    if(res.data.success){
      // pushCookie(data)

      setTimeout(() => {
        window.location.replace('/#/drafts/best');
      }, 500)

      // console.log('send web socket id success')

    } else {
      console.log('send web socket fail')
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
            // sendWebSocket(ret[1], id)

            setTimeout(() => {
              window.location.replace('/#/drafts/best');
            }, 500)
          } else {
            window.location.replace('')
          }
        })
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

      <AccountBtn onClick={onSubmit}>
        {isTattooist ? (
          <span>Login for tattooist</span>
        ) : (
          <span>Login for user</span>
        )}
      </AccountBtn>

      <AccountOtherDiv>
        <AccountOtherBtn>비밀번호 찾기</AccountOtherBtn>
        <AccountOtherBtn onClick={goRegister}>회원가입</AccountOtherBtn>
      </AccountOtherDiv>

    </>
  );
};

export default React.memo(LoginInput);
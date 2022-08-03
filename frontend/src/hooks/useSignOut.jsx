import axios from 'axios';
import React, { memo, useState } from 'react';
import { APIURL } from '../config/key';
import { getCookie } from '../config/cookie';
// ### 회원탈퇴 페이지 : 유저

// - POST : /sign-out/user
// - Body : { email, pwd }
// - Return : { success }
// - Error code
//     - err 2 : email + pwd 조합 불일치
//     - err 3 : 해당 user 없음
// - 기능정리 미완

// ### 회원탈퇴 페이지 : 타투이스트

// - POST : /sign-out/tattooist
// - Body : { email, pwd }
// - Return : { success }
// - Error code
//     - err 2 : email + pwd 조합 불일치
//     - err 4 : 해당 tattooist 없음
// - 기능정리 미완

const useSignOut = memo(({ email, pwd }) => {
  const [res, setRes] = useState(false);

  const sendRequest = async() => {
    let filter = "user"
    if(getCookie('tattooist_id')){
      filter = "tattooist"
    }

    const res = await axios.post(`${APIURL}/sign-out/${filter}`, {
      email,
      pwd
    })

    if(res.data.success){
      console.log('회원탈퇴 성공');
      setRes(true);
    } else {
      console.log('회원탈퇴 실패')
      setRes(false);
    }

  }

  // res: true면 회원탈퇴 성공 -> 로그아웃 시키기
  return [res, sendRequest];
});

export default useSignOut;
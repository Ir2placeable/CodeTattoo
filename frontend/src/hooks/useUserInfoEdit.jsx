import axios from 'axios';
import React, { memo } from 'react';
import { getCookie, setCookie } from '../config/cookie';
import { APIURL } from '../config/key';

const useUserInfoEdit = memo(({ nickname, location }) => {

  const sendRequest = async() => {
    const res = await axios.patch(`${APIURL}/user/my-page/${getCookie('user_id')}`, {
      nickname,
      location
    })

    if(res.data.success){
      console.log('유저 프로필 정보 수정 성공')
      setCookie('location', location, {maxAge: 3000, path: "/"})
      setCookie('nickname', nickname, {maxAge: 3000, path: "/"})
    } else {
      console.log('유저 프로필 정보 수정 실패')
    }
  }

  return sendRequest;
});

export default useUserInfoEdit;
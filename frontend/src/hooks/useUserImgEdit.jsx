import axios from 'axios';
import React, { memo } from 'react';
import { getCookie, setCookie } from '../config/cookie';
import { APIURL } from '../config/key';

const useUserImgEdit = memo(( image, mime ) => {

  const sendRequest = async() => {
    const res = await axios.post(`${APIURL}/user/my-page/${getCookie('user_id')}`, {
      image, 
      mime
    })

    if(res.data.success){
      console.log('유저 프로필 이미지 수정 성공')
      setCookie('profile_img_src', image, {maxAge: 3000, path: '/'})
    } else {
      console.log('유저 프로필 이미지 수정 실패')
    }
  }

  return sendRequest
  
});

export default useUserImgEdit;
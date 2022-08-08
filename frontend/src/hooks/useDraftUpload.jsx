import axios from 'axios';
import React, { memo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

// - POST : /create/draft/:id
//     - id : tattooist_id
// - body : { image, mime, title, genre, [keywords] }
//     - genre : 레터링, 블랙앤그레이…
//     - keywords : 꽃, 시계, 칼 …
// - return : { success }
const useDraftUpload = memo(({ image, mime, title, genre, keywords }) => {
  const [success, setSuccess] = useState(false);

  const sendRequest = async() => {
    const url = `create/draft/${getCookie('tattooist_id')}`

    const res = await axios.post(`${APIURL}/${url}`, {
      image, mime, title, genre, keywords
    })

    if(res.data.success){
      console.log('도안 등록 성공')
      setSuccess(true);
      //window.location.replace('/drafts/best')
    } else {
      console.log('도안 등록 실패')
      setSuccess(false);
    }

  }

  useEffect(() => {
    sendRequest()
  }, []);

  //return sendRequest
  //return [success, sendRequest]
});

export default useDraftUpload;
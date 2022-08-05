import axios from 'axios';
import React, { memo } from 'react';
import { useEffect } from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

// - POST : /create/draft/:id
//     - id : tattooist_id
// - body : { image, mime, title, genre, [keywords] }
//     - genre : 레터링, 블랙앤그레이…
//     - keywords : 꽃, 시계, 칼 …
// - return : { success }
const useDraftUpload = memo(() => {

  const sendRequest = async(data) => {
    const url = `create/draft/${getCookie('tattooist_id')}`

    const res = await axios.post(`${APIURL}/${url}`, {
      image: data.image,
      mime: data.mime,
      title: data.title,
      genre: data.genre,
      keywords: data.keywords
    })

    if(res.data.success){
      console.log('도안 등록 성공')
    } else {
      console.log('도안 등록 실패')
    }

  }

  return sendRequest
});

export default useDraftUpload;
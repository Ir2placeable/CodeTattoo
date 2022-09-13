import axios from 'axios';
import { memo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

/**
 * 사용 안하면 삭제
 */

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
    } else {
      console.log('도안 등록 실패')
      setSuccess(false);
    }

  }

  useEffect(() => {
    sendRequest()
  }, []);

});

export default useDraftUpload;
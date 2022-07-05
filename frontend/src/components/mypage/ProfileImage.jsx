import axios from 'axios';
import React, { useState } from 'react';
import { APIURL } from '../../config/key';
// - PUT : http://3.39.196.91:3001/user/my-page/image
// - body : { user_id, image, mime }
// - return : { success }
// - PUT : http://3.39.196.91:3001/tattooist/my-page/image
// - body : { tattooist_id, image, mime }
// - return : { success }
const ProfileImage = ({ cookies, filter, setCookie }) => {
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState({
    data: '',
    mime: ''
  })

  const onSelectFile = (e) => {
    if(e.target.files && e.target.files.length > 0){
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0])
      reader.addEventListener('load', () => {
        setSrc(reader.result)
      })
    }
  }
  const onLoad = () => {
    const parsing = src.split(',')
    let _mime = parsing[0].split(';')[0];
    _mime = _mime.substr(5);
    let _data = parsing[1];

    setImage({
      data: _data,
      mime: _mime
    })
  }

  const sendRequest = async() => {
    const res = await axios.put(`${APIURL}/${filter}/my-page/image`, {
      user_id: cookies.user_id,
      tattooist_id: cookies.tattooist_id,
      image: image.data,
      mime: image.mime
    })

    if(res.data.success){
      console.log('프로필 이미지 수정 완료');
      let _id = cookies.user_id;
      if(!_id){
        _id = cookies.tattooist_id;
      }
      window.location.replace(`/mypage/${filter}/${_id}`)
    }
  }

  return (
    <>
      <div>
        <input type="file" onChange={onSelectFile} />
      </div>

      <div>
        {src && (
          <img src={src} onLoad={onLoad} />
        )}
      </div>
      <div onClick={() => sendRequest()}>
        수정
      </div>
    </>
  );
};

export default ProfileImage;
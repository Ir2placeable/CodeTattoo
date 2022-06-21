import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  UploadDiv,
  EnrollImgBtn,
  ImgInput,
  ImgInputDiv,
  LoadedImg,
  LoadedImgDiv,
  LoadedImgTitle
} from '../styledComponents';
import { useNavigate } from 'react-router-dom';

const ImgLoad = ({ apiUrl, cookies }) => {
  // 이미지 소스
  const [src, setSrc] = useState(null);
  // info
  const [title, setTitle] = useState('');
  // 이미지 정보
  const [image, setImage] = useState({
    width: 300,
    height: 300,
    data: '',
    mime: ''
  })

  const onChange = (e) => {
    const { value } = e.target;
    setTitle(value);
    //console.log('title: ', title);
  }

  const onSelectFile = (e) => {
    if(e.target.files && e.target.files.length > 0){
      const reader = new FileReader();

      // base64 형식으로 읽어오기
      reader.readAsDataURL(e.target.files[0]);

      reader.addEventListener('load', () => {
        //console.log('reader: ', reader);
        setSrc(reader.result);
      })
    }
  }

  const onLoad = () => {
    const parsing = src.split(',')
    let _mime = parsing[0].split(';')[0];
    _mime = _mime.substr(5);
    let _data = parsing[1];

    setImage({
      ...image,
      data: _data,
      mime: _mime
    })
  }

  const sendRequest = async() => {
    const body = {
      drawer: cookies.isTattooist,
      title: title,
      image: image.data,
      mime: image.mime,
      width: image.width,
      height: image.height
    }
    //console.log(body)
    const res = await axios.post(`${apiUrl}/draft`, body);
    console.log(res);
  }

  const navigate = useNavigate();
  const onSubmit = () => {
    sendRequest();
    // navigate(`/tattooist/mypage/${cookies.isTattooist}`);
    window.location.replace(`/tattooist/mypage/${cookies.isTattooist}`);
  }
  return (
    <>
    <UploadDiv>

      {/* 부모: MyPageContentDiv */}
      <ImgInputDiv>
        <ImgInput type="file" onChange={onSelectFile} />
      </ImgInputDiv>

      {
        src && (
          <LoadedImgDiv>
            <LoadedImg src={src} onLoad={onLoad} /> <br />
            <LoadedImgTitle 
              type="text" 
              placeholder='도안의 이름을 작성해주세요.'
              name="title"
              value={title}
              onChange={onChange} />
            <EnrollImgBtn onClick={onSubmit}>등록</EnrollImgBtn>
          </LoadedImgDiv>
        )
      }
    </UploadDiv>
      
    </>
  );
};

export default ImgLoad;
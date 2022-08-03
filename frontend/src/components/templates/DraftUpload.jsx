import React, { useState } from 'react';
import { ImgInfoDiv } from '../../styledComponents';
import ImgChoice from '../atomic/draft_upload/ImgChoice';
import ImgLoaded from '../atomic/draft_upload/ImgLoaded';
import ImgUploadBtn from '../atomic/draft_upload/ImgUploadBtn';
import UploadDesc from '../organisms/draft/UploadDesc';

const DraftUpload = () => {
  const [src, setSrc] = useState(null);
  const [info, setInfo] = useState({
    title: '',
    description: ''
  })
  const [image, setImage] = useState({
    //width: 300,
    //height: 300,
    data: '',
    mime: ''
  })

  const {title, description} = info;

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

  const onSubmit = () => {
    if(!src || !title || !description){
      alert('모든 정보를 입력해주세요!')
    } else {

    }
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    })
  }

  return (
    <>
      <ImgChoice onSelectFile={onSelectFile} />

      <ImgInfoDiv>

        <ImgLoaded src={src} onLoad={onLoad} />

        <UploadDesc title={title} description={description}
          onChange={onChange} />

      </ImgInfoDiv>

      <ImgUploadBtn onSubmit={onSubmit} />
    </>
  );
};

export default React.memo(DraftUpload);
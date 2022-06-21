import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useState } from 'react';
import { 
  ImgInputDiv,
  ImgInput, 
  LoadedImgDiv,
  LoadedImg
} from '../styledComponents';

const ProfileImage = ({ src, setSrc, image, setImage, 
  isImgChange, setIsImgChange, cookies, userMode }) => {

  const onSelectFile = (e) => {
    if(e.target.files && e.target.files.length > 0){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.addEventListener('load', () => {
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
    setIsImgChange(true);
  }

  return (
    <>
      <ImgInputDiv>
        <ImgInput type="file" onChange={onSelectFile} />
      </ImgInputDiv>

      { src ? (
        <LoadedImgDiv>
          <LoadedImg src={src} onLoad={onLoad} /><br/>
        </LoadedImgDiv>
      ) : (
        <LoadedImgDiv>
          {userMode ? (
            <LoadedImg src={cookies.user_image} />
          ) : (
            <LoadedImg src={cookies.image} />
          )}
        </LoadedImgDiv>
      )}
    </>
  );
};

export default ProfileImage;
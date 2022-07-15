import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APIURL } from '../../config/key';
import { 
  UploadDiv, ImgInputDiv, ImgInput,
  LoadedImgDiv, LoadedImg, LoadedImgTitle,
  EnrollImgBtn, ImgInfoDiv, LoadedImgDescDiv,
  LoadedImgDesc, EmptyImgDiv, LoadedImgText,
} from '../../styledComponents';
import DropDown from '../common/DropDown';
import DropTags from '../common/DropTags';
import { genre, keywords } from '../../data';

const ImageUpload = ({ cookies }) => {
  // 이미지 소스
  const [src, setSrc] = useState(null);
  // info
  const [info, setInfo] = useState({
    title: '',
    description: ''
  })
  // 이미지 정보
  const [image, setImage] = useState({
    width: 300,
    height: 300,
    data: '',
    mime: ''
  })
  // genre, keywords
  const [inputGenre, setInputGenre] = useState('');
  const [inputKeywords, setInputKeywords] = useState([]);

  const titleInput = useRef();
  const descInput = useRef();

  const {title, description} = info;

  const onChange = (e) => {
    const { value, name } = e.target;
    
    setInfo({
      ...info,
      [name]: value
    })
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

    titleInput.current.focus();
  }

  // - POST : http://3.39.196.91:3001/main/my-draft
  // - body : { tattooist_id, image, mime, title, description }
  // - return : { success }


  const sendRequest = async() => {

    const res = await axios.post(`${APIURL}/main/my-draft`, {
      tattooist_id: cookies.tattooist_id,
      image: image.data,
      mime: image.mime,
      title: info.title,
      description: info.description,
      genre: inputGenre,
      keywords: inputKeywords
    });
    
    if(res.data.success){
      console.log('도안 업로드 성공')
      alert('Upload Success!')
      window.location.replace('/manageDraft/manage')
    } else {
      console.log('도안 업로드 실패')
    }
  }

  const onSubmit = () => {
    if(!src || !title || !description){
      alert('모든 정보를 입력해주세요!')
    } else {
      sendRequest();
    }
  }

  const onKeyUp = (e) => {
    if(e.key === 'Enter'){
      descInput.current.focus();
    }
  }

  return (
    <>
    <UploadDiv>

      {/* 부모: MyPageContentDiv */}
      <ImgInputDiv>
        <ImgInput type="file" onChange={onSelectFile} />
      </ImgInputDiv>

      <ImgInfoDiv>

        <LoadedImgDiv>
          {src ? (
            <LoadedImg src={src} onLoad={onLoad} />
          ) : (
            <EmptyImgDiv>선택된 파일 없음</EmptyImgDiv>
          )}
        </LoadedImgDiv>

        <LoadedImgDescDiv>
          <LoadedImgText>
            도안 이름 <span style={{color: 'red'}}>*</span>
          </LoadedImgText>
          <LoadedImgTitle 
            type="text" 
            placeholder='title'
            name="title"
            value={title}
            onChange={onChange}
            onKeyUp={onKeyUp}
            ref={titleInput}
          />

          <div style={{display: 'flex'}}>
            <DropDown input={inputGenre} setInput={setInputGenre} 
              text="장르" data={genre} />
            <DropTags input={inputKeywords} setInput={setInputKeywords} 
              text="주제" data={keywords} />
          </div>

          <LoadedImgText>
            도안 설명 <span style={{color: 'red'}}>*</span>
          </LoadedImgText>
          <LoadedImgDesc 
            type="text" 
            placeholder='description'
            name="description"
            value={description}
            onChange={onChange}
            ref={descInput}
          />
        </LoadedImgDescDiv>

      </ImgInfoDiv>

      <EnrollImgBtn onClick={onSubmit}>도안 업로드</EnrollImgBtn>
    </UploadDiv>
      
    </>
  );
};

export default ImageUpload;
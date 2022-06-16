import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const NewDraft = () => {
  // 이미지 소스
  const [src, setSrc] = useState(null);
  // 편집된 이미지의 정보
  const [crop, setCrop] = useState({
    unit: 'px',
    x: 130,
    y: 50,
    width: 200,
    height: 200
  })
  // 로드된 이미지를 매개변수로 이를 ref로 만들어서 접근성 높이기
  const [imageRef, setImageRef] = useState(null);
  // base64 형태로 인코딩된 이미지 url
  const [croppedImageUrl, setCroppedUrl] = useState(null);


  // crop 객체를 바꾸고 있다면 반드시 이 콜백에서 false를 반환
  const onImageLoaded = (image) => {
    // setCrop({
    //   ...crop,
    //   width: image.width,
    //   height: image.height
    // })
    console.log('image: ', image);
    setImageRef(image);
  }

  const onSelectfile = (e) => {
    // 파일이 있으면 
    if(e.target.files && e.target.files.length > 0){
      // FileAPI 사용
      const reader = new FileReader();

      // 파일 읽기
      reader.readAsDataURL(e.target.files[0]);

      // readAsDataURL 메서드가 실행이 완료되면 onload 이벤트가 발생함
      // 이 이벤트가 발생하면(읽기 완료하면) 해당 이미지를 src에 저장
      reader.addEventListener('load', () => {
        //console.log('reader.result: ', reader.result);
        setSrc(reader.result);
      })
    }
  }

  function getCroppedImg(image, crop, filename){
    // canvas 태그 생성
    const canvas = document.createElement("canvas");
    // canvas 영역을 잘려진 이미지 크기 만큼 조절
    canvas.width = crop.width;
    canvas.height = crop.height;

    const img = new Image();
    img.src = src;

    // canvas 렌더링 컨텍스트 함수 사용
    const ctx = canvas.getContext("2d");
    
    // drawImage() 메서드로 이미지를 그림
    img.onload = () => {
      ctx.drawImage(
      // 원본 이미지 영역
      img,  // 원본 이미지 영역
      crop.x,  // 잘려진 이미지 x 좌표
      crop.y,  // 잘려진 이미지 y 좌표
      crop.width, // 잘려진 이미지 가로 길이
      crop.height, // 잘려진 이미지 세로 길이
      // canvas 영역
      0, // 이미지 시작 x 좌표
      0, // 이미지 시작 y 좌표
      crop.width,  // 이미지 가로 길이
      crop.height // 이미지 세로 길이 
    )
    }


    // canvas 이미지를 base64 형식으로 인코딩된 URL를 생성 후 반환
    return new Promise(resolve => {
      resolve(canvas.toDataURL());
    })
  }

  // 내부에서 getCroppedImg 함수 호출
  // 잘라진 영역의 이미지를 전달
  async function makeClientCrop(crop) {
    if(imageRef && crop.width && crop.height){
      // getCroppedImg 결과괎을 반영
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        'newfile.jpeg'
      )
      setCroppedUrl(croppedImageUrl);
      console.log('원본 src: ', src);
      console.log('croppedURL: ', croppedImageUrl)
    }
  }

  // 마우스 드래그가 끝나면 선택한 영역을 보여주는 콜백 함수 작성
  const onCropComplete = (crop, percentCrop) => {
    makeClientCrop(crop);
  }

  // 자르기 동작의 모든 변화마다 실행되는 콜백 함수 (드래그/크기 조정)
  const onCropChange = (crop, percentCrop) => {
    setCrop(crop)
  }

  return (
    <>
      {/* 파일 선택 영역 */}
      <div>
        <input type="file" onChange={onSelectfile} />
      </div>

      {/* 선택된 파일을 편집하는 원본 이미지 영역 */}
      {
        src && (
          <ReactCrop
            crop={crop}
            onComplete={onCropComplete}
            onChange={onCropChange}
          >
            <img src={src} onLoad={onImageLoaded} />
          </ReactCrop>
        )
      }

      {/* 편집된 이미지를 보여주는 영역 */}
      {
        croppedImageUrl && (
          <img alt="Crop" style={{maxWidth: '100%'}} src={croppedImageUrl} 
            onLoad={()=>{console.log('로드 성공')}} />
        )
      }
    </>
  );
};

export default NewDraft;
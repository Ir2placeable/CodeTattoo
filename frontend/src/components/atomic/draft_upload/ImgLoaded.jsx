import React from 'react';
import { 
  LoadedImgDiv, LoadedImg, EmptyImgDiv
} from '../../../styledComponents';

/** 상위 컴포넌트 === DraftUpload.jsx
 * 도안 업로드 페이지 / 도안 업로드 이미지
 * @param {String} src 도안 이미지 소스
 * @param {Function} onLoad base64 형식의 데이타 파싱
 */
const ImgLoaded = ({ src, onLoad }) => {
  return (
    <LoadedImgDiv>
      {src ? (
        <LoadedImg src={src} onLoad={onLoad} />
      ) : (
        <EmptyImgDiv>선택된 파일 없음</EmptyImgDiv>
      )}
    </LoadedImgDiv>
  );
};

export default React.memo(ImgLoaded);
import React from 'react';
import { 
  LoadedImgDiv, LoadedImg, EmptyImgDiv
} from '../../../styledComponents';

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
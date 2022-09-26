import React from 'react';
import { 
  ImgInputDiv, ImgInput, 
} from '../../../styledComponents';

/** 상위 컴포넌트 === DraftUpload.jsx
 * 도안 업로드 페이지 / 업로드할 도안 선택 버튼
 * @param {Function} onSelectFile 이미지 파일 선택 & base64 형식으로 읽어오기
 */
const ImgChoice = ({onSelectFile}) => {
  return (
    <>
      <ImgInputDiv>
        <ImgInput type="file" onChange={onSelectFile} />
      </ImgInputDiv>
    </>
  );
};

export default React.memo(ImgChoice);